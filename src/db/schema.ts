// Types para MongoDB collections

export interface User {
	_id: string
	imageUrl?: string
	username: string
	passwordHash: string
}

export interface Category {
	_id: string
	userId: string
	name: string
}

export interface Transaction {
	_id: string
	description: string
	amountInCents: number
	type: 'income' | 'expense'
	paymentDate: string
	categoryId?: string
	userId: string
}

// Nomes das collections
export const COLLECTIONS = {
	USERS: 'users',
	CATEGORIES: 'categories',
	TRANSACTIONS: 'transactions',
} as const
