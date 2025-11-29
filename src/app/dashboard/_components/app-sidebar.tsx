import { DollarSignIcon, FolderIcon, HomeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@/assets/logo1.png'
import { PreserveQueryLink } from '@/components/preserve-query-link'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'

const items = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		icon: HomeIcon,
	},
	{
		title: 'Transações',
		url: '/dashboard/transactions',
		icon: DollarSignIcon,
	},
]

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<Link href="/dashboard" className="p-2">
					<Image src={logoImg} alt="zeus" width={140} />
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<PreserveQueryLink href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</PreserveQueryLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}

							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="/dashboard/categories">
										<FolderIcon />
										<span>Categorias</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
