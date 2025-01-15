import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy",
}


export default async function PrivacyPolicyPage() {

  return (
    <div className="flex flex-col py-6 items-center" data-testid="privacy-policy-container">
      Terms and Conditions of Sale
      Last Updated: [Insert Date]

      1. Products and Services

      The website offers both personalized and non-personalized clothing items. All products are described in detail on their respective presentation pages.

      2. Prices and Payments
      • All final prices are stated in euros and include any applicable taxes.
      • Payments are processed through [Available payment methods: Stripe].

      3. Shipping and Delivery
      • Products are delivered via courier, with shipping costs borne by the buyer unless promotional offers apply.
      • Estimated delivery time is 7 business days. The Seller is not responsible for delays caused by the courier.

      4. Right of Withdrawal

      Due to the nature of the products, all sales are final. Returns are accepted only if you received a damaged or incorrect item. International orders are accepted.
      • Returned products must be intact and in resalable condition.
      • To exercise the right of withdrawal, customers must send written notice to the following email address: [Insert contact email].
      • Return shipping costs are the responsibility of the customer.
      • Refunds will be processed within 14 days of receiving the returned item.

      5. Warranty and Complaints

      In the case of defective or non-compliant products, customers must report the issue within 14 days of receipt by writing to [Insert contact email].

      6. Limitations of Liability

      The Seller is not liable for:
      • Indirect damages resulting from the use of the website or purchased products.
      • Typographical or descriptive errors in product listings.
      • Limited availability or out-of-stock items.
      • Damages resulting from improper use of purchased products.

      7. Cookie Policy

      This website uses only essential cookies necessary to ensure proper functionality and user experience. Essential cookies include:
      • Managing user sessions;
      • Login functionality;
      • Storing items in the shopping cart.

      No cookies are used for tracking or marketing purposes.

      8. Management of Personal Data and Authentication

      For authentication and personal data management, the website uses Supabase, a secure platform compliant with data protection regulations. Here’s how we handle and protect your data:
      • Purpose of Data Collection: Personal data provided by users (e.g., email and password) is used solely for authentication and access to services.
      • Data Storage and Security: Data is securely stored on Supabase servers and protected with advanced encryption during transfer and at rest.
      • Data Access: Only authorized personnel can access data for purposes strictly related to service operations.

      9. Changes to the Terms and Conditions

      The Seller reserves the right to modify these Terms and Conditions at any time. Changes will take effect from the date of publication on the website.
    </div>
  )
}
