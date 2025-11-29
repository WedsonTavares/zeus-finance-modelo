'use server'

import { createId } from '@paralleldrive/cuid2'
import { revalidatePath } from 'next/cache'
import z from 'zod'
import { getDb } from '@/db'
import { COLLECTIONS, type Transaction } from '@/db/schema'
import { getSession } from '@/lib/auth'
import { actionClient } from '@/lib/safe-action'

const createTransactionSchema = z.object({
	description: z.string().min(1, { message: 'Descrição é obrigatória.' }),
	amountInCents: z
		.number({ error: 'Valor é inválido' })
		.min(1, { message: 'Valor é obrigatório.' }),
	type: z.enum(['income', 'expense']),
	categoryId: z.string().min(1, { message: 'Categoria é obrigatória.' }),
	paymentDate: z.string().min(1, { message: 'Data é obrigatória.' }),
})

export const createTransaction = actionClient
	.inputSchema(createTransactionSchema)
	.action(async ({ parsedInput }) => {
		const session = await getSession()

		if (!session?.userId) {
			throw new Error('Usuário não autenticado.')
		}

		const db = await getDb()
		const transaction: Transaction = {
			_id: createId(),
			userId: session.userId,
			description: parsedInput.description,
			amountInCents: parsedInput.amountInCents,
			type: parsedInput.type,
			categoryId: parsedInput.categoryId,
			paymentDate: parsedInput.paymentDate,
		}
		await db.collection<Transaction>(COLLECTIONS.TRANSACTIONS).insertOne(transaction)

		revalidatePath('/dashboard/transactions')
	})
