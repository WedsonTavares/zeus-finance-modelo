import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import type { Category } from '@/types/category'
import { CategoryTableItem } from './category-table-item'

type CategoriesTableProps = {
	categories: Category[]
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
	return (
		<Table className="text-base">
			<TableHeader>
				<TableRow>
					<TableHead className="font-semibold">Nome</TableHead>
					<TableHead className="w-[40px]">&nbsp;</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="text-zinc-700">
				{categories.map((category) => (
					<CategoryTableItem key={category.id} category={category} />
				))}
			</TableBody>
		</Table>
	)
}
