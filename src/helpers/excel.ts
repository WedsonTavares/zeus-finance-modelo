import { utils, write } from 'xlsx'

export function generateExcelFile<T>(data: T[]) {
	const worksheet = utils.json_to_sheet(data)
	const workbook = utils.book_new()

	utils.book_append_sheet(workbook, worksheet, 'Transações')

	const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' })
	return excelBuffer
}

// biome-ignore lint/suspicious/noExplicitAny: This is a utility function for generating Excel files.
export function downloadExcelFile(filename: string, excelBuffer: any) {
	const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
	const url = window.URL.createObjectURL(blob)
	const a = document.createElement('a')

	a.href = url
	a.download = `${filename}.xlsx`
	a.click()
	window.URL.revokeObjectURL(url)
}
