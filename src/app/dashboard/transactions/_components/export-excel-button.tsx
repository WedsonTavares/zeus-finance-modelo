'use client'

import dayjs from 'dayjs'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { months } from '@/constants/months'
import { downloadExcelFile, generateExcelFile } from '@/helpers/excel'
import { formatPrice } from '@/helpers/format-price'
import type { Transaction } from '@/types/transaction'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

type ExportExcelButtonProps = {
	transactions: Transaction[]
	month: number
	year: number
}

function downloadPlainFile(filename: string, content: string, mime: string) {
	const blob = new Blob([content], { type: mime })
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = filename
	document.body.appendChild(a)
	a.click()
	a.remove()
	URL.revokeObjectURL(url)
}

export function ExportExcelButton({ transactions, month, year }: ExportExcelButtonProps) {
	const [format, setFormat] = useState<'xlsx' | 'csv' | 'json' | 'xml'>('xlsx')
	const [selectedMonth, setSelectedMonth] = useState<number>(month)
	const [selectedYear, setSelectedYear] = useState<number>(year)

	function buildDataRows() {
		return transactions.map((transaction) => ({
			Motivo: transaction.description,
			Valor: formatPrice(transaction.amountInCents / 100),
			Categoria: transaction.category?.name ?? 'Sem categoria',
			Data: dayjs(transaction.paymentDate).format('DD/MM/YYYY'),
			Tipo: transaction.type === 'expense' ? 'Despesa' : 'Receita',
		}))
	}

	async function handleExportAction(closeDialog: () => void) {
		if (transactions.length === 0) {
			toast.error('Nenhuma transação para exportar.')
			return
		}

		const data = buildDataRows()
		const monthName = months[selectedMonth].toLowerCase()
		const baseName = `planilha-${monthName}-${selectedYear}`

		try {
			if (format === 'xlsx') {
				const excelBuffer = generateExcelFile(data)
				downloadExcelFile(baseName, excelBuffer)
			} else if (format === 'csv') {
				const headers = Object.keys(data[0])
				const csv = [headers.join(',')]
					.concat(
						data.map((row) =>
							headers
								.map((h) => {
									const v = (row as any)[h] ?? ''
									return `"${String(v).replace(/"/g, '""')}"`
								})
								.join(','),
						),
					)
					.join('\n')

				downloadPlainFile(`${baseName}.csv`, csv, 'text/csv;charset=utf-8;')
			} else if (format === 'json') {
				const json = JSON.stringify(data, null, 2)
				downloadPlainFile(`${baseName}.json`, json, 'application/json')
			} else if (format === 'xml') {
				// Simple XML serializer
				const xmlItems = data
					.map((row) =>
						'<item>' +
						Object.entries(row)
							.map(([k, v]) => `<${k}>${String(v)}</${k}>`)
							.join('') +
						'</item>',
					)
					.join('')
				const xml = `<?xml version="1.0" encoding="UTF-8"?><rows>${xmlItems}</rows>`
				downloadPlainFile(`${baseName}.xml`, xml, 'application/xml')
			}

			toast.success('Exportação iniciada.')
			// Fecha o modal programaticamente clicando no botão de fechar
			if (typeof document !== 'undefined') {
				const closeBtn = document.querySelector('[data-slot="dialog-close"]') as HTMLElement | null
				closeBtn?.click()
			}
			closeDialog()
		} catch (err) {
			console.error(err)
			toast.error('Erro ao exportar os dados.')
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" disabled={transactions.length === 0}>
					Exportar
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Exportar Transações</DialogTitle>
					<DialogDescription>Escolha o formato de exportação e o nome do arquivo.</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Formato</label>
						<div className="flex gap-2">
							<Button
								variant={format === 'xlsx' ? 'default' : 'outline'}
								onClick={() => setFormat('xlsx')}
								size="sm"
							>
								Excel (.xlsx)
							</Button>
							<Button
								variant={format === 'csv' ? 'default' : 'outline'}
								onClick={() => setFormat('csv')}
								size="sm"
							>
								CSV
							</Button>
							<Button
								variant={format === 'json' ? 'default' : 'outline'}
								onClick={() => setFormat('json')}
								size="sm"
							>
								JSON
							</Button>
							<Button
								variant={format === 'xml' ? 'default' : 'outline'}
								onClick={() => setFormat('xml')}
								size="sm"
							>
								XML
							</Button>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium mb-1">Mês</label>
							<select
								className="w-full rounded-md border px-3 py-2"
								value={selectedMonth}
								onChange={(e) => setSelectedMonth(Number(e.target.value))}
							>
								{months.map((m, idx) => (
									<option key={m} value={idx}>
										{m}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">Ano</label>
							<select
								className="w-full rounded-md border px-3 py-2"
								value={selectedYear}
								onChange={(e) => setSelectedYear(Number(e.target.value))}
							>
								{Array.from({ length: 5 }).map((_, i) => {
									const y = year - 2 + i
									return (
										<option key={y} value={y}>
											{y}
										</option>
									)
								})}
							</select>
						</div>
					</div>
				</div>

				<div className="mt-6 flex justify-end gap-2">
					<DialogClose asChild>
						<Button variant="outline">Fechar</Button>
					</DialogClose>
					{/* invisible wrapper to call export and then close */}
					<DialogClose asChild>
						<Button
							onClick={() => handleExportAction(() => {})}
							disabled={transactions.length === 0}
						>
							Exportar
						</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	)
}
