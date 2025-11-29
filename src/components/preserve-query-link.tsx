'use client'

import Link, { type LinkProps } from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

type PreserveQueryLinkProps = LinkProps & {
	children: React.ReactNode
}

function PreserveQueryLinkContent({
	children,
	href,
	...props
}: PreserveQueryLinkProps) {
	const searchParams = useSearchParams()
	const fullHref = `${href}?${searchParams.toString()}`

	return (
		<Link href={fullHref} {...props}>
			{children}
		</Link>
	)
}

export function PreserveQueryLink(props: PreserveQueryLinkProps) {
	return (
		<Suspense>
			<PreserveQueryLinkContent {...props} />
		</Suspense>
	)
}
