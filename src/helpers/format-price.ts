export function formatPrice(value: number): string {
	const priceFormatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	})

	return priceFormatter.format(value)
}
