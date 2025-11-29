export function getLastFiveYears() {
	const currentYear = new Date().getFullYear()
	return Array.from({ length: 5 }, (_, i) => currentYear - i)
}
