import "styles/globals.css"
import { Inter, Roboto_Mono, Anonymous_Pro } from 'next/font/google'
import { Metadata } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const anonymousPro = Anonymous_Pro({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-anonymous-pro',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html 
      lang="en" 
      data-mode="light" 
      className={`bg-def-0 ${robotoMono.variable} ${anonymousPro.variable}`} 
      suppressHydrationWarning
    >
      <body className="bg-transparent font-mono">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}