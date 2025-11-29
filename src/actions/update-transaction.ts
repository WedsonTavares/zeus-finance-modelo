'use server'

import { revalidatePath } from 'next/cache'
import z from 'zod'
import { getDb } from '@/db'
import { COLLECTIONS, type Transaction } from '@/db/schema'
import { getSession } from '@/lib/auth'
import { actionClient } from '@/lib/safe-action'

const updateTransactionSchema = z.object({
	id: z.string(),
	description: z.string().min(1, { message: 'Descrição é obrigatória.' }),
	amountInCents: z
		.number({ error: 'Valor é inválido' })
		.min(1, { message: 'Valor é obrigatório.' }),
	type: z.enum(['income', 'expense']),
	categoryId: z.string().min(1, { message: 'Categoria é obrigatória.' }),
	paymentDate: z.string().min(1, { message: 'Data é obrigatória.' }),
})

export const updateTransaction = actionClient
	.inputSchema(updateTransactionSchema)
	.action(async ({ parsedInput }) => {
		const session = await getSession()

		if (!session?.userId) {
			throw new Error('Usuário não autenticado.')
		}

		const db = await getDb()
		const transaction = await db
			.collection<Transaction>(COLLECTIONS.TRANSACTIONS)
			.findOne({ _id: parsedInput.id })

		if (!transaction) {
			throw new Error('Transação não encontrada.')
		}

		if (transaction.userId !== session.userId) {
			throw new Error('Usuário não autorizado.')
		}

		await db
			.collection<Transaction>(COLLECTIONS.TRANSACTIONS)
			.updateOne(
				{ _id: parsedInput.id },
				{
					$set: {
						description: parsedInput.description,
						amountInCents: parsedInput.amountInCents,
						type: parsedInput.type,
						categoryId: parsedInput.categoryId,
						paymentDate: parsedInput.paymentDate,
					},
				},
			)

		revalidatePath('/dashboard/transactions')
	})
