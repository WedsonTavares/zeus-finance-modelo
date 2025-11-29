import type { Category } from './category'

export type Transaction = {
	id: string
	type: 'income' | 'expense'
	description: string
	amountInCents: number
	paymentDate: string
	category: Category | null
}
