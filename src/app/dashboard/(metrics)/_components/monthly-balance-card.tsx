'use client'

import { Pie, PieChart } from 'recharts'
import { EmptyData } from '@/components/empty-data'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from '@/components/ui/chart'
import type { Transaction } from '@/types/transaction'

const chartConfig = {
	income: {
		label: 'Receitas',
	},
	expense: {
		label: 'Despesas',
	},
} satisfies ChartConfig

type MonthlyBalanceCardProps = {
	transactions: Transaction[]
}

export function MonthlyBalanceCard({ transactions }: MonthlyBalanceCardProps) {
	const total = transactions.reduce(
		(acc, transaction) => {
			if (transaction.type === 'income') {
				acc.income += transaction.amountInCents / 100
			} else {
				acc.expense += transaction.amountInCents / 100
			}
			return acc
		},
		{
			income: 0,
			expense: 0,
		},
	)

	const grandTotal = total.income + total.expense

	const chartData = [
		{
			type: 'income',
			amount: total.income,
			percentage: grandTotal > 0 ? (total.income / grandTotal) * 100 : 0,
			fill: 'var(--color-green-500)',
		},
		{
			type: 'expense',
			amount: total.expense,
			percentage: grandTotal > 0 ? (total.expense / grandTotal) * 100 : 0,
			fill: 'var(--color-red-500)',
		},
	]

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Resumo do mês</CardTitle>
				<CardDescription>
					Vejo o quanto você ganhou e gastou no mês de agosto.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				{transactions.length > 0 ? (
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-[300px]"
					>
						<PieChart>
							<ChartTooltip cursor={false} content={<CustomTooltip />} />
							<Pie data={chartData} dataKey="amount" nameKey="type" />
						</PieChart>
					</ChartContainer>
				) : (
					<EmptyData />
				)}
			</CardContent>
		</Card>
	)
}

type TooltipPayload = {
	payload: {
		type: string
		percentage: number
	}
}

type CustomTooltipProps = {
	active?: boolean
	payload?: TooltipPayload[]
}

export function CustomTooltip({ active, payload }: CustomTooltipProps) {
	if (!active || !payload || payload.length === 0) {
		return null
	}

	const data = payload[0].payload
	const label = data.type === 'income' ? 'Entradas' : 'Saídas'
	const percentage = Math.round(data.percentage)

	return (
		<div className="rounded-lg border bg-background p-2 shadow-sm">
			<div className="grid grid-cols-1 gap-2">
				<div className="flex flex-col">
					<span className="text-xs font-medium text-foreground">{label}</span>
					<span className="text-xs text-muted-foreground">{percentage}%</span>
				</div>
			</div>
		</div>
	)
}
