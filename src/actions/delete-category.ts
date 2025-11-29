'use server'

import { revalidatePath } from 'next/cache'
import { getDb } from '@/db'
import { COLLECTIONS, type Category } from '@/db/schema'
import { getSession } from '@/lib/auth'

export async function deleteCategory(categoryId: string) {
	const session = await getSession()

	if (!session?.userId) {
		throw new Error('Usuário não autenticado.')
	}

	const db = await getDb()
	const category = await db
		.collection<Category>(COLLECTIONS.CATEGORIES)
		.findOne({ _id: categoryId })

	if (!category) {
		throw new Error('Categoria não encontrada.')
	}

	if (category.userId !== session.userId) {
		throw new Error('Usuário não autorizado.')
	}

	await db.collection<Category>(COLLECTIONS.CATEGORIES).deleteOne({ _id: categoryId })

	revalidatePath('/dashboard/categories')
}
