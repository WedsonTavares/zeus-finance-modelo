import 'dotenv/config'

import { createId } from '@paralleldrive/cuid2'
import bcrypt from 'bcryptjs'
import dayjs from 'dayjs'
import { getDb } from './index'
import { COLLECTIONS } from './schema'
import type { Category, Transaction, User } from './schema'

async function main() {
	console.log('🌱 Iniciando seed do banco de dados...')

	const db = await getDb()

	// Clear data
	await db.collection(COLLECTIONS.TRANSACTIONS).deleteMany({})
	await db.collection(COLLECTIONS.CATEGORIES).deleteMany({})
	await db.collection(COLLECTIONS.USERS).deleteMany({})

	// Create admin user
	const userId = createId()
	const user: User = {
		_id: userId,
		username: 'admin',
		passwordHash: await bcrypt.hash('admin123', 10),
		imageUrl: 'https://github.com/shadcn.png',
	}
	await db.collection(COLLECTIONS.USERS).insertOne(user)

	console.log('✅ Usuário criado com sucesso!')

	// Create categories
	const categoryEntries = [
		{ key: 'food', name: 'Alimentação' },
		{ key: 'health', name: 'Saúde' },
		{ key: 'education', name: 'Educação' },
		{ key: 'home', name: 'Casa' },
		{ key: 'leisure', name: 'Lazer' },
		{ key: 'investments', name: 'Investimentos' },
		{ key: 'work', name: 'Trabalho' },
		{ key: 'shopping', name: 'Compras' },
		{ key: 'transport', name: 'Transporte' },
		{ key: 'others', name: 'Outros' },
	].map((category) => ({
		_id: createId(),
		name: category.name,
		userId,
		key: category.key, // Vamos usar isso para mapear depois
	}))

	const categories: Category[] = categoryEntries.map(({ key, ...category }) => category as Category)
	await db.collection(COLLECTIONS.CATEGORIES).insertMany(categories)

	console.log('✅ Categorias criadas com sucesso!')

	// Create category map for easy reference
	const categoryMap = categoryEntries.reduce(
		(acc, category) => {
			acc[category.key] = category._id
			return acc
		},
		{} as Record<string, string>,
	)

	// Create 20 transactions
	const transactions: Transaction[] = [
		{
			_id: createId(),
			description: 'Salário',
			amountInCents: 450000, // R$ 4.500,00
			type: 'income' as const,
			categoryId: categoryMap.work,
			paymentDate: dayjs('2024-08-01').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Freelance',
			amountInCents: 120000, // R$ 1.200,00
			type: 'income' as const,
			categoryId: categoryMap.work,
			paymentDate: dayjs('2024-08-15').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Rendimento Investimentos',
			amountInCents: 25000, // R$ 250,00
			type: 'income' as const,
			categoryId: categoryMap.investments,
			paymentDate: dayjs('2024-08-30').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Supermercado',
			amountInCents: 45000, // R$ 450,00
			type: 'expense' as const,
			categoryId: categoryMap.food,
			paymentDate: dayjs('2024-08-02').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Restaurante',
			amountInCents: 8500, // R$ 85,00
			type: 'expense' as const,
			categoryId: categoryMap.food,
			paymentDate: dayjs('2024-08-05').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Lanche',
			amountInCents: 1200, // R$ 12,00
			type: 'expense' as const,
			categoryId: categoryMap.food,
			paymentDate: dayjs('2024-08-10').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Aluguel',
			amountInCents: 120000, // R$ 1.200,00
			type: 'expense' as const,
			categoryId: categoryMap.home,
			paymentDate: dayjs('2024-08-01').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Energia Elétrica',
			amountInCents: 15000, // R$ 150,00
			type: 'expense' as const,
			categoryId: categoryMap.home,
			paymentDate: dayjs('2024-08-08').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Internet',
			amountInCents: 8000, // R$ 80,00
			type: 'expense' as const,
			categoryId: categoryMap.home,
			paymentDate: dayjs('2024-08-12').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Combustível',
			amountInCents: 25000, // R$ 250,00
			type: 'expense' as const,
			categoryId: categoryMap.transport,
			paymentDate: dayjs('2024-08-03').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Uber',
			amountInCents: 3500, // R$ 35,00
			type: 'expense' as const,
			categoryId: categoryMap.transport,
			paymentDate: dayjs('2024-08-07').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Plano de Saúde',
			amountInCents: 35000, // R$ 350,00
			type: 'expense' as const,
			categoryId: categoryMap.health,
			paymentDate: dayjs('2024-08-01').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Farmácia',
			amountInCents: 4500, // R$ 45,00
			type: 'expense' as const,
			categoryId: categoryMap.health,
			paymentDate: dayjs('2024-08-14').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Cinema',
			amountInCents: 3000, // R$ 30,00
			type: 'expense' as const,
			categoryId: categoryMap.leisure,
			paymentDate: dayjs('2024-08-09').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Streaming Netflix',
			amountInCents: 2500, // R$ 25,00
			type: 'expense' as const,
			categoryId: categoryMap.leisure,
			paymentDate: dayjs('2024-08-15').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Curso Online',
			amountInCents: 15000, // R$ 150,00
			type: 'expense' as const,
			categoryId: categoryMap.education,
			paymentDate: dayjs('2024-08-06').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Livros',
			amountInCents: 8000, // R$ 80,00
			type: 'expense' as const,
			categoryId: categoryMap.education,
			paymentDate: dayjs('2024-08-20').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Roupas',
			amountInCents: 12000, // R$ 120,00
			type: 'expense' as const,
			categoryId: categoryMap.shopping,
			paymentDate: dayjs('2024-08-11').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Material de Escritório',
			amountInCents: 5000, // R$ 50,00
			type: 'expense' as const,
			categoryId: categoryMap.work,
			paymentDate: dayjs('2024-08-13').toISOString(),
			userId,
		},
		{
			_id: createId(),
			description: 'Presente Aniversário',
			amountInCents: 6000, // R$ 60,00
			type: 'expense' as const,
			categoryId: categoryMap.others,
			paymentDate: dayjs('2024-08-18').toISOString(),
			userId,
		},
	]

	await db.collection(COLLECTIONS.TRANSACTIONS).insertMany(transactions)

	console.log('✅ 20 transações criadas com sucesso!')
	console.log('🎉 Seed concluído!')
}

// Run seed
main()
	.then(() => {
		console.log('✅ Seed executed successfully!')
		process.exit(0)
	})
	.catch((error) => {
		console.error('❌ Error executing seed:', error)
		process.exit(1)
	})
