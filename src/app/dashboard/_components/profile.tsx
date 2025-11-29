import { getProfile } from '@/actions/get-profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { LogoutButton } from './logout-button'

export async function Profile() {
	const profile = await getProfile()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton size="lg" className="w-fit">
					<Avatar className="size-10">
						<AvatarImage src={profile?.imageUrl ?? ''} />
						<AvatarFallback>
							{profile.name.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>

					<div className="hidden sm:flex flex-col">
						<strong className="text-sm font-medium">{profile.name}</strong>
						<span className="text-xs text-muted-foreground">Administrador</span>
					</div>
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-56">
				<LogoutButton />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
