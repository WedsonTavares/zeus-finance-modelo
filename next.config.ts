import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// When building the mock/demo static site we enable the static
	// export behavior by setting `output: 'export'`.
	// This makes `next build` generate an `out/` folder for Netlify
	// drag-and-drop or manual uploads when `NEXT_PUBLIC_MOCK=1`.
	output: process.env.NEXT_PUBLIC_MOCK === '1' ? 'export' : undefined,
}

export default nextConfig
