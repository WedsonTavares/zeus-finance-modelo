import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import type { Transaction } from '@/types/transaction'
import { TransactionTableItem } from './transaction-table-item'

type TransactionsTableProps = {
	transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
	return (
		<Table className="text-base">
			<TableHeader>
				<TableRow>
					<TableHead className="font-semibold">Descrição</TableHead>
					<TableHead className="font-semibold">Valor</TableHead>
					<TableHead className="font-semibold">Categoria</TableHead>
					<TableHead className="font-semibold">Data</TableHead>
					<TableHead className="w-[40px]">&nbsp;</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="text-zinc-700">
				{transactions.map((transaction) => (
					<TransactionTableItem
						key={transaction.id}
						transaction={transaction}
					/>
				))}
			</TableBody>
		</Table>
	)
}
