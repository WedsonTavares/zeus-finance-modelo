'use server'

import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { returnValidationErrors } from 'next-safe-action'
import z from 'zod'
import { getDb } from '@/db'
import { COLLECTIONS, type User } from '@/db/schema'
import { createSession } from '@/lib/auth'
import { actionClient } from '@/lib/safe-action'

const loginSchema = z.object({
	username: z
		.string()
		.min(3, { message: 'Usuário deve ter pelo menos 3 caracteres.' }),
	password: z
		.string()
		.min(6, { message: 'Senha deve ter pelo menos 6 caracteres.' }),
})

export const login = actionClient
	.inputSchema(loginSchema)
	.action(async ({ parsedInput }) => {
		const db = await getDb()
		const user = await db
			.collection<User>(COLLECTIONS.USERS)
			.findOne({ username: parsedInput.username })

		if (!user) {
			returnValidationErrors(loginSchema, {
				_errors: ['Credenciais inválidas.'],
			})
		}

		const matchedPassword = await bcrypt.compare(
			parsedInput.password,
			user.passwordHash,
		)

		if (!matchedPassword) {
			returnValidationErrors(loginSchema, {
				_errors: ['Credenciais inválidas.'],
			})
		}

		await createSession(user._id)
		redirect('/dashboard')
	})
