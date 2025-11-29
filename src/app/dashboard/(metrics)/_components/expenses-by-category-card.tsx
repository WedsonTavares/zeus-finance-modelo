'use client'

import { TrendingDownIcon } from 'lucide-react'
import { EmptyData } from '@/components/empty-data'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatPrice } from '@/helpers/format-price'
import type { Transaction } from '@/types/transaction'

type ExpensesByCategoryCardProps = {
	transactions: Transaction[]
}

type ExpensesByCategory = {
	categoryId: string
	categoryName: string
	totalInCents: number
	count: number
}

export function ExpensesByCategoryCard({
	transactions,
}: ExpensesByCategoryCardProps) {
	const expensesByCategory = transactions
		.filter((transaction) => {
			return transaction.type === 'expense' && transaction.category !== null
		})
		.reduce(
			(acc, transaction) => {
				const categoryId = transaction.category!.id
				const categoryName = transaction.category!.name

				if (!categoryId) {
					return acc
				}

				if (!acc[categoryId]) {
					acc[categoryId] = {
						categoryId,
						categoryName,
						totalInCents: 0,
						count: 0,
					}
				}

				acc[categoryId].totalInCents += transaction.amountInCents
				acc[categoryId].count += 1

				return acc
			},
			{} as Record<string, ExpensesByCategory>,
		)

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Despesas por categoria</CardTitle>
				<CardDescription>
					Veja as despesas agrupadas por categoria
				</CardDescription>
			</CardHeader>
			<CardContent className="px-2 flex-1">
				{Object.values(expensesByCategory).length > 0 ? (
					<ScrollArea className="h-[312px] w-full rounded-md px-4">
						<div className="space-y-4">
							{Object.values(expensesByCategory).map((category) => (
								<ExpenseCategoryCard
									key={category.categoryId}
									category={category}
								/>
							))}
						</div>
					</ScrollArea>
				) : (
					<EmptyData />
				)}
			</CardContent>
		</Card>
	)
}

export function ExpenseCategoryCard({
	category,
}: {
	category: ExpensesByCategory
}) {
	const amount = formatPrice(category.totalInCents / 100)

	return (
		<div className="flex items-center justify-between p-3 border rounded-lg">
			<div className="flex items-center gap-3">
				<div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
					<TrendingDownIcon className="size-5 text-muted-foreground" />
				</div>
				<div className="flex flex-col">
					<span className="font-medium text-sm">{category.categoryName}</span>
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<span>Quantidade: {category.count}</span>
					</div>
				</div>
			</div>

			<span className="font-medium hidden sm:block text-red-600">{amount}</span>
		</div>
	)
}
