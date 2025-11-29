'use client'

import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { deleteTransaction } from '@/actions/delete-transaction'
import { Button } from '@/components/ui/button'

type DeleteTransactionButtonProps = {
	transactionId: string
}

export function DeleteTransactionButton({
	transactionId,
}: DeleteTransactionButtonProps) {
	const handleDeleteTransaction = async () => {
		if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
			try {
				await deleteTransaction(transactionId)
				toast.success('Transação excluída com sucesso.')
			} catch {
				toast.error('Erro ao excluir transação.')
			}
		}
	}

	return (
		<Button
			size="icon"
			variant="outline"
			aria-label="Excluir"
			className="hover:text-red-600 hover:border-red-600"
			onClick={handleDeleteTransaction}
		>
			<Trash2Icon className="size-5" />
		</Button>
	)
}
