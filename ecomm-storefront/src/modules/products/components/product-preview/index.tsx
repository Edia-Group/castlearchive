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
      <div 
        data-testid="product-wrapper" 
        className="flex flex-col items-center p-3 sm:p-4"
      >
        <div className="w-full aspect-square mb-4">
          <Thumbnail
            thumbnail={productPreview.thumbnail}
            size="full"
            isFeatured={isFeatured}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-col items-center w-full space-y-2">
          <h3 className="text-lg sm:text-xl lg:text-2xl text-[#691C73] text-center line-clamp-2">
            {productPreview.title}
          </h3>
          
          <div className="text-base sm:text-lg lg:text-xl text-[#7BA7CE]">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          
          <div className="flex justify-center w-full mt-2">
            <ButtonProduct 
              buttonText="ADD TO CART"
              textClassName="text-lg"
              aria-label={`Add ${productPreview.title} to cart`}
            />
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}