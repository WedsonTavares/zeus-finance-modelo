'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createCategory } from '@/actions/create-category'
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
import {
	type CategoryFormData,
	categoryFormSchema,
} from '../../_schemas/category-form-schema'

export function AddCategoryForm() {
	const form = useForm<CategoryFormData>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: '',
		},
	})

	const createCategoryAction = useAction(createCategory, {
		onSuccess: () => {
			toast.success('Categoria criada com sucesso.')
			form.reset({ name: '' })
			// Fecha o modal automaticamente clicando no botão de fechar do Dialog
			if (typeof document !== 'undefined') {
				const closeBtn = document.querySelector('[data-slot="dialog-close"]') as HTMLElement | null
				closeBtn?.click()
			}
		},
		onError: () => {
			toast.error('Erro ao criar categoria.')
		},
	})

	function handleCreateCategory(values: CategoryFormData) {
		createCategoryAction.execute({
			name: values.name,
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleCreateCategory)}
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

				<Button type="submit" disabled={createCategoryAction.isPending}>
					{createCategoryAction.isPending && (
						<LoaderIcon className="size-5 animate-spin" />
					)}
					{createCategoryAction.isPending ? 'Salvando' : 'Salvar'}
				</Button>
			</form>
		</Form>
	)
}
