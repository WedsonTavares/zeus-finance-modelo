import { type NextRequest, NextResponse } from 'next/server'
import { getSession } from './lib/auth'

const publicRoutes = ['/login']

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname

	const isProtectedRoute = path.startsWith('/dashboard')
	const isPublicRoute = publicRoutes.includes(path)

	const session = await getSession()

	if (isProtectedRoute && !session?.userId) {
		return NextResponse.redirect(new URL('/login', request.nextUrl))
	}

	if (isPublicRoute && session?.userId) {
		return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
