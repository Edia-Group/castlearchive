import { CartWithCheckoutStep } from "types/global"
import { Customer } from "@medusajs/medusa"
import Divider from "@modules/common/components/divider"
import EmptyCartMessage from "../components/empty-cart-message"
import ItemsTemplate from "./items"
import SignInPrompt from "../components/sign-in-prompt"
import Summary from "./summary"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: CartWithCheckoutStep | null
  customer: Omit<Customer, "password_hash"> | null
}) => {
  return (
      <div className="py-12">
        <div className="content-container" data-testid="cart-container">
          {cart?.items.length ? (
            <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-40">
              <div className="flex flex-col py-6 gap-y-6">
                {!customer && (
                  <>
                    <SignInPrompt />
                    <Divider />
                  </>
                )}
                <ItemsTemplate region={cart?.region} items={cart?.items} />
              </div>
              <div className="relative">
                <div className="flex flex-col gap-y-4 sticky top-12">
                  {cart && cart.region && (
                    <>
                      <div className="bg-def py-6">
                        <Summary cart={cart} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <EmptyCartMessage />
            </div>
          )}
        </div>
      </div>
  )
}

export default CartTemplate
