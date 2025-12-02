import { MongoClient } from 'mongodb'

let clientPromise: Promise<MongoClient> | null = null

async function createClientPromise() {
	const uri = process.env.MONGODB_URI
	if (!uri) {
		throw new Error('MONGODB_URI não está definido nas variáveis de ambiente')
	}

	const client = new MongoClient(uri)

	if (process.env.NODE_ENV === 'development') {
		const globalWithMongo = global as typeof globalThis & {
			_mongoClientPromise?: Promise<MongoClient>
		}

		if (!globalWithMongo._mongoClientPromise) {
			globalWithMongo._mongoClientPromise = client.connect()
		}
		return globalWithMongo._mongoClientPromise
	}

	return client.connect()
}

export async function getDb() {
	// Ensure we only require a DB when not in mock mode
	if (!process.env.MONGODB_URI && process.env.NEXT_PUBLIC_MOCK === '1') {
		throw new Error('getDb should not be called in mock mode')
	}

	if (!clientPromise) {
		clientPromise = createClientPromise()
	}

	const client = await clientPromise
	return client.db('zeusfinance')
}

export { clientPromise }
