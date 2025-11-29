'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateCategory } from '@/actions/update-category'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { Category } from '@/types/category'
import {
	type CategoryFormData,
	categoryFormSchema,
} from '../../_schemas/category-form-schema'

type EditCategoryFormProps = {
	category: Category
	onSuccess?: () => void
}

export function EditCategoryForm({
	category,
	onSuccess,
}: EditCategoryFormProps) {
	const form = useForm<CategoryFormData>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: category.name,
		},
	})

	const updateCategoryAction = useAction(updateCategory, {
		onSuccess: () => {
			toast.success('Categoria atualizada com sucesso.')
			onSuccess?.()
		},
		onError: () => {
			toast.error('Erro ao atualizar categoria.')
		},
	})

	function handleUpdateCategory(values: CategoryFormData) {
		updateCategoryAction.execute({
			id: category.id,
			name: values.name,
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleUpdateCategory)}
				className="space-y-6"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={updateCategoryAction.isPending}>
					{updateCategoryAction.isPending && (
						<LoaderIcon className="size-5 animate-spin" />
					)}
					{updateCategoryAction.isPending ? 'Atualizando' : 'Atualizar'}
				</Button>
			</form>
		</Form>
	)
}
