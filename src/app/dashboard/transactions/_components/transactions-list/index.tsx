import type { Transaction } from '@/types/transaction'
import { TransactionsListItem } from './transactions-list-item'

type TransactionsListProps = {
	transactions: Transaction[]
}

export function TransactionsList({ transactions }: TransactionsListProps) {
	return (
		<>
			{transactions.map((transaction) => (
				<TransactionsListItem key={transaction.id} transaction={transaction} />
			))}
		</>
	)
}
