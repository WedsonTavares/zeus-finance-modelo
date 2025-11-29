'use server'

import { revalidatePath } from 'next/cache'
import { getDb } from '@/db'
import { COLLECTIONS, type Transaction } from '@/db/schema'
import { getSession } from '@/lib/auth'

export async function deleteTransaction(transactionId: string) {
	const session = await getSession()

	if (!session?.userId) {
		throw new Error('Usuário não autenticado.')
	}

	const db = await getDb()
	const transaction = await db
		.collection<Transaction>(COLLECTIONS.TRANSACTIONS)
		.findOne({ _id: transactionId })

	if (!transaction) {
		throw new Error('Transação não encontrada.')
	}

	if (transaction.userId !== session.userId) {
		throw new Error('Usuário não autorizado.')
	}

	await db
		.collection<Transaction>(COLLECTIONS.TRANSACTIONS)
		.deleteOne({ _id: transactionId })

	revalidatePath('/dashboard/transactions')
}
