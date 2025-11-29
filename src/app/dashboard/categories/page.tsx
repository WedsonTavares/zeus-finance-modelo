import { getCategories } from '@/actions/get-categories'
import { FormDialog } from '@/components/form-dialog'
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { AddCategoryForm } from './_components/add-category-form'
import { CategoriesTable } from './_components/categories-table'

export default async function DashboardCategoriesPage() {
	const categories = await getCategories()

	return (
		<Card>
			<CardHeader className="flex flex-wrap gap-4 items-center justify-between">
				<CardTitle>Categorias</CardTitle>

				<CardAction className="space-x-2">
					<FormDialog
						title="Adicionar Categoria"
						description="Preencha os dados da nova categoria"
						operation="add"
					>
						<AddCategoryForm />
					</FormDialog>
				</CardAction>
			</CardHeader>
			<CardContent>
				<CategoriesTable categories={categories} />
			</CardContent>
		</Card>
	)
}
