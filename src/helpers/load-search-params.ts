import { createLoader, parseAsInteger } from 'nuqs/server'

export const monthYearSearchParams = {
	month: parseAsInteger.withDefault(new Date().getMonth()),
	year: parseAsInteger.withDefault(new Date().getFullYear()),
}

export const loadSearchParams = createLoader(monthYearSearchParams)
