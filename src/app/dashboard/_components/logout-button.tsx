'use client'

import { LogOutIcon } from 'lucide-react'
import { logout } from '@/actions/logout'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function LogoutButton() {
	return (
		<DropdownMenuItem onClick={() => logout()}>
			<LogOutIcon className="size-5 text-red-600" />
			Sair da conta
		</DropdownMenuItem>
	)
}
