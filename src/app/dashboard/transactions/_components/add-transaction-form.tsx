'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { LoaderIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'
import { createTransaction } from '@/actions/create-transaction'
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useCategories } from '@/hooks/use-categories'
import {
	type TransactionFormData,
	transactionFormSchema,
} from '../../_schemas/transaction-form-schema'

const initialState: TransactionFormData = {
	description: '',
	amount: 0,
	categoryId: '',
	type: 'expense',
	paymentDate: dayjs().format('YYYY-MM-DD'),
}

export function AddTransactionForm() {
	const { data: categories, isLoading: isLoadingCategories } = useCategories()

	const form = useForm<TransactionFormData>({
		resolver: zodResolver(transactionFormSchema),
		defaultValues: initialState,
	})

	const createTransactionAction = useAction(createTransaction, {
		onSuccess: () => {
			toast.success('Transação criada com sucesso.')
			form.reset(initialState)
			// Fecha o modal automaticamente clicando no botão de fechar do Dialog
			if (typeof document !== 'undefined') {
				const closeBtn = document.querySelector('[data-slot="dialog-close"]') as HTMLElement | null
				closeBtn?.click()
			}
		},
		onError: () => {
			toast.error('Erro ao criar transação.')
		},
	})

	function handleCreateTransaction(values: TransactionFormData) {
		// Combina a data selecionada com a hora atual
		const selectedDate = dayjs(values.paymentDate)
		const now = dayjs()
		const dateWithCurrentTime = selectedDate
			.hour(now.hour())
			.minute(now.minute())
			.second(now.second())
			.millisecond(now.millisecond())
		
		createTransactionAction.execute({
			description: values.description,
			categoryId: values.categoryId,
			type: values.type,
			amountInCents: values.amount * 100,
			paymentDate: dateWithCurrentTime.toISOString(),
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleCreateTransaction)}
				className="space-y-6"
			>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor</FormLabel>
							<FormControl>
								<NumericFormat
									value={field.value}
									onValueChange={(value) => {
										field.onChange(value.floatValue)
									}}
									decimalScale={2}
									fixedDecimalScale
									decimalSeparator=","
									allowNegative={false}
									allowLeadingZeros={false}
									thousandSeparator="."
									customInput={Input}
									prefix="R$"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tipo de Transação</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl className="w-full">
									<SelectTrigger>
										<SelectValue placeholder="Selecione um tipo" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="income">
										<TrendingUpIcon className="size-5 text-green-500" />
										Receita
									</SelectItem>

									<SelectItem value="expense">
										<TrendingDownIcon className="size-5 text-red-500" />
										Despesa
									</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="categoryId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Categoria</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value}
								disabled={isLoadingCategories}
							>
								<FormControl className="w-full">
									<SelectTrigger>
										<SelectValue placeholder="Selecione uma categoria" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories?.map((category) => (
										<SelectItem key={category.id} value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="paymentDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Data de Pagamento</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={createTransactionAction.isPending}>
					{createTransactionAction.isPending && (
						<LoaderIcon className="size-5 animate-spin" />
					)}
					{createTransactionAction.isPending ? 'Salvando' : 'Salvar'}
				</Button>
			</form>
		</Form>
	)
}
