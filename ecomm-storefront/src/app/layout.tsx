import { Metadata } from "next"
import "styles/globals.css"
import SynthwaveGrid from "@modules/synthwavegrid/SynthwaveGrid"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className="bg-transparent" suppressHydrationWarning>
      <body className="bg-transparent">
        <main className="relative text-white">{props.children}</main>
      </body>
    </html>
  )
}