import { months } from '@/constants/months'

export const profile = {
  id: 'user_demo',
  name: 'Usuário Demo',
  imageUrl: '/avatar.png',
}

export const categories = [
  { id: 'c1', name: 'Trabalho' },
  { id: 'c2', name: 'Alimentação' },
  { id: 'c3', name: 'Transporte' },
  { id: 'c4', name: 'Lazer' },
]

const today = new Date()
const thisYear = today.getFullYear()
const thisMonth = today.getMonth()

function iso(day: number, hour = 12, minute = 0) {
  return new Date(thisYear, thisMonth, day, hour, minute, 0, 0).toISOString()
}

export const transactions = [
  {
    id: 't1',
    description: 'Saldo salário',
    amountInCents: 21300,
    type: 'income',
    paymentDate: iso(1, 22, 45),
    category: { id: 'c1', name: 'Trabalho' },
  },
  {
    id: 't2',
    description: 'Vale Refeição',
    amountInCents: 7000,
    type: 'income',
    paymentDate: iso(1, 22, 7),
    category: { id: 'c1', name: 'Trabalho' },
  },
  {
    id: 't3',
    description: 'Freelance Website',
    amountInCents: 125000,
    type: 'income',
    paymentDate: iso(1, 22, 6),
    category: { id: 'c1', name: 'Trabalho' },
  },
  {
    id: 't4',
    description: 'Vale alimentação',
    amountInCents: 43000,
    type: 'income',
    paymentDate: iso(1, 22, 5),
    category: { id: 'c1', name: 'Trabalho' },
  },
  {
    id: 't5',
    description: 'Almoço restaurante',
    amountInCents: -5600,
    type: 'expense',
    paymentDate: iso(1, 22, 5),
    category: { id: 'c2', name: 'Alimentação' },
  },
  {
    id: 't6',
    description: 'Transporte',
    amountInCents: -1000,
    type: 'expense',
    paymentDate: iso(1, 23, 7),
    category: { id: 'c3', name: 'Transporte' },
  },
]

export default { profile, categories, transactions }
