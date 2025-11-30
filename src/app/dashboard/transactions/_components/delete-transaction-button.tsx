'use client'

import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteTransaction } from '@/actions/delete-transaction'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

type DeleteTransactionButtonProps = {
	transactionId: string
}

export function DeleteTransactionButton({
	transactionId,
}: DeleteTransactionButtonProps) {
	const [isOpen, setIsOpen] = useState(false)

	const handleDeleteTransaction = async () => {
		try {
			await deleteTransaction(transactionId)
			toast.success('Transação excluída com sucesso.')
			setIsOpen(false)
		} catch {
			toast.error('Erro ao excluir transação.')
		}
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				<Button
					size="icon"
					variant="outline"
					aria-label="Excluir"
					className="hover:text-red-600 hover:border-red-600"
				>
					<Trash2Icon className="size-5" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
					<AlertDialogDescription>
						Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteTransaction}
						className="bg-red-600 hover:bg-red-700"
					>
						Excluir
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
