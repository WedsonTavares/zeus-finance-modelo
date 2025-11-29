'use client'

import dayjs from 'dayjs'
import { useState } from 'react'
import { FormDialog } from '@/components/form-dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/helpers/format-price'
import type { Transaction } from '@/types/transaction'
import { DeleteTransactionButton } from '../delete-transaction-button'
import { EditTransactionForm } from '../edit-transaction-form'

type TransactionTableItemProps = {
	transaction: Transaction
}

export function TransactionTableItem({
	transaction,
}: TransactionTableItemProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const amount = formatPrice(transaction.amountInCents / 100)

	return (
		<TableRow key={transaction.id}>
			<TableCell>{transaction.description}</TableCell>
			{transaction.type === 'expense' ? (
				<TableCell>- {amount}</TableCell>
			) : (
				<TableCell className="text-green-600">{amount}</TableCell>
			)}
			<TableCell>{transaction.category?.name ?? 'Sem categoria'}</TableCell>
			<TableCell>
				{dayjs(transaction.paymentDate).format('DD/MM/YYYY')}
			</TableCell>
			<TableCell className="flex items-center gap-2">
				<FormDialog
					title="Editar Transação"
					description="Altere os dados da transação"
					operation="edit"
					open={isDialogOpen}
					onOpenChange={setIsDialogOpen}
				>
					<EditTransactionForm
						transaction={transaction}
						onSuccess={() => setIsDialogOpen(false)}
					/>
				</FormDialog>

				<DeleteTransactionButton transactionId={transaction.id} />
			</TableCell>
		</TableRow>
	)
}
