import z from 'zod'

export const transactionFormSchema = z.object({
	description: z.string().min(2, { message: 'Descrição é obrigatória.' }),
	amount: z
		.number({ error: 'Valor é inválido' })
		.min(1, { message: 'Valor é obrigatório.' }),
	type: z.enum(['income', 'expense']),
	categoryId: z.string().min(1, { message: 'Categoria é obrigatória.' }),
	paymentDate: z.string().min(1, { message: 'Data é obrigatória.' }),
})

export type TransactionFormData = z.infer<typeof transactionFormSchema>
