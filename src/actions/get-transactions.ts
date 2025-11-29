'use server'

import { getDb } from '@/db'
import { COLLECTIONS, type Category, type Transaction as TransactionSchema } from '@/db/schema'
import { getSession } from '@/lib/auth'
import type { Transaction } from '@/types/transaction'

type GetTransactionsParams = {
	month: number
	year: number
}

export async function getTransactions({ month, year }: GetTransactionsParams) {
	const session = await getSession()

	if (!session?.userId) {
		throw new Error('Usuário não autenticado.')
	}

	const db = await getDb()
	
	// Criar datas para filtrar o mês/ano
	const startDate = new Date(year, month, 1).toISOString()
	const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999).toISOString()

	const transactions = await db
		.collection<TransactionSchema>(COLLECTIONS.TRANSACTIONS)
		.aggregate([
			{
				$match: {
					userId: session.userId,
					paymentDate: { $gte: startDate, $lte: endDate },
				},
			},
			{
				$lookup: {
					from: COLLECTIONS.CATEGORIES,
					localField: 'categoryId',
					foreignField: '_id',
					as: 'categoryData',
				},
			},
			{
				$sort: { paymentDate: -1 },
			},
			{
				$project: {
					id: '$_id',
					_id: 0,
					description: 1,
					amountInCents: 1,
					type: 1,
					paymentDate: 1,
					category: {
						$cond: {
							if: { $gt: [{ $size: '$categoryData' }, 0] },
							then: {
								id: { $arrayElemAt: ['$categoryData._id', 0] },
								name: { $arrayElemAt: ['$categoryData.name', 0] },
							},
							else: null,
						},
					},
				},
			},
		])
		.toArray()

	return transactions as Transaction[]
}
