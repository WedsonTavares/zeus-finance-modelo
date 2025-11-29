'use server'

import { getDb } from '@/db'
import { COLLECTIONS, type Category as CategorySchema } from '@/db/schema'
import { getSession } from '@/lib/auth'
import type { Category } from '@/types/category'

export async function getCategories() {
	const session = await getSession()

	if (!session?.userId) {
		throw new Error('Usuário não autenticado.')
	}

	const db = await getDb()
	const categories = await db
		.collection<CategorySchema>(COLLECTIONS.CATEGORIES)
		.find({ userId: session.userId })
		.project({ _id: 1, name: 1 })
		.sort({ name: 1 })
		.toArray()

	return categories.map((c) => ({ id: c._id, name: c.name })) as Category[]
}
