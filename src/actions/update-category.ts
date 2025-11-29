'use server'

import { revalidatePath } from 'next/cache'
import z from 'zod'
import { getDb } from '@/db'
import { COLLECTIONS, type Category } from '@/db/schema'
import { getSession } from '@/lib/auth'
import { actionClient } from '@/lib/safe-action'

const updateCategorySchema = z.object({
	id: z.string(),
	name: z.string().min(1, { message: 'Nome é obrigatório.' }),
})

export const updateCategory = actionClient
	.inputSchema(updateCategorySchema)
	.action(async ({ parsedInput }) => {
		const session = await getSession()

		if (!session?.userId) {
			throw new Error('Usuário não autenticado.')
		}

		const db = await getDb()
		const category = await db
			.collection<Category>(COLLECTIONS.CATEGORIES)
			.findOne({ _id: parsedInput.id })

		if (!category) {
			throw new Error('Categoria não encontrada.')
		}

		if (category.userId !== session.userId) {
			throw new Error('Usuário não autorizado.')
		}

		await db
			.collection<Category>(COLLECTIONS.CATEGORIES)
			.updateOne({ _id: parsedInput.id }, { $set: { name: parsedInput.name } })

		revalidatePath('/dashboard/categories')
	})
