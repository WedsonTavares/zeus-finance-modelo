'use client'

import dayjs from 'dayjs'
import { useState } from 'react'
import { FormDialog } from '@/components/form-dialog'
import { formatPrice } from '@/helpers/format-price'
import type { Transaction } from '@/types/transaction'
import { DeleteTransactionButton } from '../delete-transaction-button'
import { EditTransactionForm } from '../edit-transaction-form'

type TransactionsListItemProps = {
	transaction: Transaction
}

export function TransactionsListItem({
	transaction,
}: TransactionsListItemProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const amount = formatPrice(transaction.amountInCents / 100)

	return (
		<div key={transaction.id} className="border-b border-gray-200 py-3">
			<div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
				<div className="flex-1 space-y-1.5">
					<h3 className="text-base font-medium text-gray-900 truncate">
						{transaction.description}
					</h3>

					<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
						<span>{transaction.category?.name ?? 'Sem categoria'}</span>
						<span>•</span>
						<span>{dayjs(transaction.paymentDate).format('DD/MM/YYYY')}</span>
					</div>

					<div className="flex items-center gap-2 sm:hidden">
						<strong className="text-sm font-semibold">Valor:</strong>
						<TransactionValue type={transaction.type} amount={amount} />
					</div>
				</div>

				<div className="flex items-center gap-4 mt-2 sm:mt-0">
					<div className="hidden sm:inline-block">
						<TransactionValue type={transaction.type} amount={amount} />
					</div>

					<div className="flex items-center gap-1.5">
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
					</div>
				</div>
			</div>
		</div>
	)
}

function TransactionValue({
	type,
	amount,
}: {
	type: 'income' | 'expense'
	amount: string
}) {
	return (
		<>
			{type === 'expense' ? (
				<span className="text-sm">- {amount}</span>
			) : (
				<span className="text-sm text-green-600">{amount}</span>
			)}
		</>
	)
}
