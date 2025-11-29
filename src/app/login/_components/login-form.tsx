'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { login } from '@/actions/login'
import logoImg from '@/assets/logo1.png'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
	username: z
		.string()
		.min(3, { message: 'Usuário deve ter pelo menos 3 caracteres.' }),
	password: z
		.string()
		.min(6, { message: 'Senha deve ter pelo menos 6 caracteres.' }),
})

type FormData = z.infer<typeof formSchema>

export function LoginForm() {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const loginAction = useAction(login, {
		onError: ({ error }) => {
			const errorMessage =
				error.validationErrors?._errors?.[0] ?? 'Erro ao fazer login.'
			toast.error(errorMessage)
		},
	})

	function handleLogin(values: FormData) {
		loginAction.execute({
			username: values.username,
			password: values.password,
		})
	}

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<Image src={logoImg} alt="zeus" width={140} />

				<CardDescription className="mt-1">
					Entre na sua conta para acessar seus dados financeiros.
				</CardDescription>
			</CardHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleLogin)}>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Usuário</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="mt-6">
						<Button
							type="submit"
							className="w-full"
							disabled={loginAction.isPending}
						>
							{loginAction.isPending && (
								<LoaderIcon className="size-5 animate-spin" />
							)}
							{loginAction.isPending ? 'Entrando...' : 'Entrar'}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	)
}
