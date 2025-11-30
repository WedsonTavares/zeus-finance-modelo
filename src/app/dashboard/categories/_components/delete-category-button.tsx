'use client'

import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteCategory } from '@/actions/delete-category'
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

type DeleteCategoryButtonProps = {
	categoryId: string
}

export function DeleteCategoryButton({
	categoryId,
}: DeleteCategoryButtonProps) {
	const [isOpen, setIsOpen] = useState(false)

	const handleDeleteCategory = async () => {
		try {
			await deleteCategory(categoryId)
			toast.success('Categoria excluída com sucesso.')
			setIsOpen(false)
		} catch {
			toast.error('Erro ao excluir categoria.')
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
						Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDeleteCategory}
						className="bg-red-600 hover:bg-red-700"
					>
						Excluir
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
