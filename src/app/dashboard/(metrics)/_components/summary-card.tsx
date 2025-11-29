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

const icons = {
	income: <TrendingUpIcon className="size-8 text-green-500" />,
	expense: <TrendingDownIcon className="size-8 text-red-500" />,
	balance: <ScaleIcon className="size-8 text-zinc-500" />,
}

export function SummaryCard({ type, value }: SummaryCardProps) {
	return (
		<Card>
			<CardContent className="flex items-center gap-4">
				<div className="size-16 rounded-md bg-muted flex items-center justify-center">
					{icons[type]}
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
