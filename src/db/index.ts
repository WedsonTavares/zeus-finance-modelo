import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
	throw new Error('MONGODB_URI não está definido nas variáveis de ambiente')
}

const client = new MongoClient(process.env.MONGODB_URI)

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
	// Em desenvolvimento, use uma variável global para preservar o cliente entre hot reloads
	const globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>
	}

	if (!globalWithMongo._mongoClientPromise) {
		globalWithMongo._mongoClientPromise = client.connect()
	}
	clientPromise = globalWithMongo._mongoClientPromise
} else {
	// Em produção, sempre crie uma nova conexão
	clientPromise = client.connect()
}

export async function getDb() {
	const client = await clientPromise
	return client.db('zeusfinance')
}

export { clientPromise }
