import "styles/globals.css"

import { Inter } from 'next/font/google'
import { Metadata } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      data-mode="light" 
      className={`bg-def-0 ${inter.variable}`} 
      suppressHydrationWarning
    >
      <body className="bg-transparent font-sans">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
