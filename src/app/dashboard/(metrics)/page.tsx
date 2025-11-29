import type { SearchParams } from 'nuqs/server'
import { getTransactions } from '@/actions/get-transactions'

import { loadSearchParams } from '@/helpers/load-search-params'
import { ExpensesByCategoryCard } from './_components/expenses-by-category-card'
import { LatestTransactionsCard } from './_components/latest-transactions-card'
import { MonthlyBalanceCard } from './_components/monthly-balance-card'
import { Summary } from './_components/summary'

type HomeProps = {
	searchParams: Promise<SearchParams>
}

export default async function Home({ searchParams }: HomeProps) {
	const { month, year } = await loadSearchParams(searchParams)
	const transactions = await getTransactions({ month, year })

	return (
		<>
			<Summary transactions={transactions} />

			<div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
				<MonthlyBalanceCard transactions={transactions} />
				<ExpensesByCategoryCard transactions={transactions} />
				<LatestTransactionsCard transactions={transactions} />
			</div>
		</>
	)
}
