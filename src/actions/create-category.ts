'use server'

import { createId } from '@paralleldrive/cuid2'
import { revalidatePath } from 'next/cache'
import z from 'zod'
import { getDb } from '@/db'
import { COLLECTIONS, type Category } from '@/db/schema'
import { getSession } from '@/lib/auth'
import { actionClient } from '@/lib/safe-action'

const createCategorySchema = z.object({
	name: z.string().min(1, { message: 'Nome é obrigatório.' }),
})

export const createCategory = actionClient
	.inputSchema(createCategorySchema)
	.action(async ({ parsedInput }) => {
		const session = await getSession()

		if (!session?.userId) {
			throw new Error('Usuário não autenticado.')
		}

		const db = await getDb()
		const category: Category = {
			_id: createId(),
			userId: session.userId,
			name: parsedInput.name,
		}
		await db.collection<Category>(COLLECTIONS.CATEGORIES).insertOne(category)

		revalidatePath('/dashboard/categories')
	})
