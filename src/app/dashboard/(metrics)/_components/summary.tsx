import { useMemo } from 'react'
import { formatPrice } from '@/helpers/format-price'
import type { Transaction } from '@/types/transaction'
import { SummaryCard } from './summary-card'

export function Summary({ transactions }: { transactions: Transaction[] }) {
	const summary = useMemo(() => {
		return transactions.reduce(
			(acc, transaction) => {
				if (transaction.type === 'income') {
					acc.income += transaction.amountInCents
					acc.balance += transaction.amountInCents
				} else {
					acc.expense += transaction.amountInCents
					acc.balance -= transaction.amountInCents
				}

				return acc
			},
			{
				income: 0,
				expense: 0,
				balance: 0,
			},
		)
	}, [transactions])

	const formattedIncome = formatPrice(summary.income / 100)
	const formattedExpense = formatPrice(summary.expense / 100)
	const formattedBalance = formatPrice(summary.balance / 100)

	return (
		<div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
			<SummaryCard type="income" value={formattedIncome} />
			<SummaryCard type="expense" value={formattedExpense} />
			<SummaryCard type="balance" value={formattedBalance} />
		</div>
	)
}
