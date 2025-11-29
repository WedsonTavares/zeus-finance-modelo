import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import { QueryProvider } from '@/components/query-provider'

const sora = Sora({
	variable: '--font-sora',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'Zeus Finance - Controle suas finanças pessoais com facilidade',
	description:
		'Zeus Finance é fácil para controlar suas finanças pessoais.',
	robots: {
		index: false,
		follow: false,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${sora.variable} antialiased font-sans`}>
				<QueryProvider>
					<NuqsAdapter>{children}</NuqsAdapter>
				</QueryProvider>
				<Toaster richColors position="bottom-center" />
			</body>
		</html>
	)
}
