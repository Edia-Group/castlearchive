import { Metadata } from "next"
import FAQContent from "@modules/faq/components"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Read our most frequently asked questions",
}

export default function FAQPage() {
  return <FAQContent />
}