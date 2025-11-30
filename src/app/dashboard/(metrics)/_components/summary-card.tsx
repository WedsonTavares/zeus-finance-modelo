import { ScaleIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

type SummaryCardProps = {
	type: 'income' | 'expense' | 'balance'
	value: string
}

const labels = {
	income: 'Receitas',
	expense: 'Despesas',
	balance: 'Saldo',
}

function parseCurrency(value: string) {
	if (!value) return 0
	// Remove currency symbol, spaces, thousands separator and normalize decimal separator
	const cleaned = value
		.replace(/\s/g, '')
		.replace(/R\$/g, '')
		.replace(/\./g, '')
		.replace(/,/g, '.')
		.replace(/[^0-9.\-]/g, '')

	const n = parseFloat(cleaned)
	return Number.isNaN(n) ? 0 : n
}

export function SummaryCard({ type, value }: SummaryCardProps) {
	const numeric = parseCurrency(value)

	let iconColor = 'text-zinc-500'
	if (type === 'income') iconColor = 'text-green-500'
	if (type === 'expense') iconColor = 'text-red-500'
	if (type === 'balance') {
		if (numeric > 0) iconColor = 'text-green-500'
		else if (numeric < 0) iconColor = 'text-red-500'
		else iconColor = 'text-zinc-500'
	}

	const IconComponent =
		type === 'income' ? TrendingUpIcon : type === 'expense' ? TrendingDownIcon : ScaleIcon

	return (
		<Card>
			<CardContent className="flex items-center gap-4">
				<div className="size-16 rounded-md bg-muted flex items-center justify-center">
					<IconComponent className={`size-8 ${iconColor}`} />
				</div>

				<div className="flex flex-col gap-0.5">
					<span className="text-zinc-600">{labels[type]}</span>
					<strong className="text-xl text-zinc-800 font-semibold">
						{value}
					</strong>
				</div>
			</CardContent>
		</Card>
	)
}
