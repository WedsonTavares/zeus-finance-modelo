import { InboxIcon } from 'lucide-react'

type EmptyDataProps = {
	message?: string
}

export function EmptyData({ message }: EmptyDataProps) {
	return (
		<div className="min-h-40 h-full flex flex-col items-center justify-center gap-2 border-dashed border-2 border-gray-300 rounded-lg">
			<InboxIcon className="size-8 text-muted-foreground" />
			<p className="text-center text-muted-foreground">
				{message || 'Nenhuma transação encontrada.'}
			</p>
		</div>
	)
}
