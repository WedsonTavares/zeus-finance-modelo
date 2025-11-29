'use server'

import { getDb } from '@/db'
import { COLLECTIONS, type User } from '@/db/schema'
import { getSession } from '@/lib/auth'

export async function getProfile() {
	const session = await getSession()

	if (!session?.userId) {
		throw new Error('Usuário não autenticado.')
	}

	const db = await getDb()
	const user = await db
		.collection<User>(COLLECTIONS.USERS)
		.findOne({ _id: session.userId })

	if (!user) {
		throw new Error('Usuário não encontrado.')
	}

	return {
		id: user._id,
		name: user.username,
		imageUrl: user.imageUrl,
	}
}
