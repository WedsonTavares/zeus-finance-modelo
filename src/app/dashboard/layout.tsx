import { Suspense } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'
import { MonthYearPicker } from './_components/month-year-picker'
import { Profile } from './_components/profile'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1">
				<header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-6 z-10">
					<SidebarTrigger />

					<Suspense>
						<MonthYearPicker />
					</Suspense>

					<div className="ml-auto">
						<Profile />
					</div>
				</header>

				<div className="p-6">{children}</div>
			</main>
		</SidebarProvider>
	)
}
