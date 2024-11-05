import ButtonProduct from "../button-product"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PreviewPrice from "./price"
import { ProductPreviewType } from "types/global"
import { Region } from "@medusajs/medusa"
import Thumbnail from "../thumbnail"
import { getProductPrice } from "@lib/util/get-product-price"
import { retrievePricedProductById } from "@lib/data"

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group bg-transparent"
    >
      <div data-testid="product-wrapper" className="bg-transparent">
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="full"
          isFeatured={isFeatured}
          className="bg-transparent"
        />
        <div className="flex flex-col text-[#691C73] items-center mt-6">
          <div className="mb-3 text-4xl">{productPreview.title}</div>
          <div className="text-[#7BA7CE] text-2xl">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <div className="mt-2">
            <ButtonProduct 
              buttonText="ADD TO CART"
              aria-label={`Add ${productPreview.title} to cart`}
            />
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}