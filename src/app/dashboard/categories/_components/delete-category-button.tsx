'use client'

import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { deleteCategory } from '@/actions/delete-category'
import { Button } from '@/components/ui/button'

type DeleteCategoryButtonProps = {
	categoryId: string
}

export function DeleteCategoryButton({
	categoryId,
}: DeleteCategoryButtonProps) {
	const handleDeleteCategory = async () => {
		if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
			try {
				await deleteCategory(categoryId)
				toast.success('Transação excluída com sucesso.')
			} catch {
				toast.error('Erro ao excluir categoria.')
			}
		}
	}

	return (
		<Button
			size="icon"
			variant="outline"
			aria-label="Excluir"
			className="hover:text-red-600 hover:border-red-600"
			onClick={handleDeleteCategory}
		>
			<Trash2Icon className="size-5" />
		</Button>
	)
}
