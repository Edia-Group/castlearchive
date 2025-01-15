import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import Divider from "@modules/common/components/divider"
import { Heading } from "@medusajs/ui"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import { cookies } from "next/headers"
import { getCart } from "@lib/data"

const CheckoutSummary = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  const cart = await getCart(cartId).then((cart) => cart)

  if (!cart) {
    return null
  }

  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-4 py-8 small:py-0 ">
      <div className="w-full bg-def flex flex-col">
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline"
        >
          In your Cart
        </Heading>
        <Divider className="my-6" />
        <CartTotals data={cart} />
        <ItemsPreviewTemplate region={cart?.region} items={cart?.items} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
