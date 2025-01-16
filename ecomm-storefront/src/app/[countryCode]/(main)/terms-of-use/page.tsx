/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read our terms of use",
}

export default async function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid="terms-conditions-container">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Terms and Conditions
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">1. Products and Services</h2>
          <p className="text-base-regular">
            The website offers both personalized and non-personalized clothing items. All products are described in detail on their respective presentation pages.
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">2. Prices and Payments</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>All final prices are stated in euros or dollars (depending on the country from which the order is placed) and include any applicable taxes.</li>
            <li>Payments are processed through Stripe</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">3. Shipping and Delivery</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Products are delivered via courier, with shipping costs borne by the buyer unless promotional offers apply.</li>
            <li>Estimated delivery time is 7 business days. The Seller is not responsible for delays caused by the courier.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">4. Right of Withdrawal</h2>
          <p className="mb-4">Due to the nature of the products, all sales are final. Returns are accepted only if you received a damaged or incorrect item. International orders are accepted.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Returned products must be intact and in resalable condition.</li>
            <li>To exercise the right of withdrawal, customers must send written notice to the following email address: castle.archive1@gmail.com</li>
            <li>Return shipping costs are the responsibility of the customer.</li>
            <li>Refunds will be processed within 14 days of receiving the returned item.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">5. Warranty and Complaints</h2>
          <p className="text-base-regular">
            In the case of defective or non-compliant products, customers must report the issue within 14 days of receipt by writing to castle.archive1@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">6. Limitations of Liability</h2>
          <p className="mb-2">The Seller is not liable for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Indirect damages resulting from the use of the website or purchased products.</li>
            <li>Typographical or descriptive errors in product listings.</li>
            <li>Limited availability or out-of-stock items.</li>
            <li>Damages resulting from improper use of purchased products.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">7. Cookie Policy</h2>
          <p className="mb-4">This website uses only essential cookies necessary to ensure proper functionality and user experience. Essential cookies include:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Managing user sessions;</li>
            <li>Login functionality;</li>
            <li>Storing items in the shopping cart.</li>
          </ul>
          <p className="mt-4">No cookies are used for tracking or marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">8. Management of Personal Data and Authentication</h2>
          <p className="mb-4">For authentication and personal data management, the website uses Supabase, a secure platform compliant with data protection regulations. Here's how we handle and protect your data:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Purpose of Data Collection: Personal data provided by users (e.g., email and password) is used solely for authentication and access to services.</li>
            <li>Data Storage and Security: Data is securely stored on Supabase servers and protected with advanced encryption during transfer and at rest.</li>
            <li>Data Access: Only authorized personnel can access data for purposes strictly related to service operations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">9. Changes to the Terms and Conditions</h2>
          <p className="text-base-regular">
            The Seller reserves the right to modify these Terms and Conditions at any time.
          </p>
        </section>
      </div>
    </div>
  )
}