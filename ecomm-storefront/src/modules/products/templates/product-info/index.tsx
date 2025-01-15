import { Heading, Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

type ProductInfoProps = {
  product: PricedProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info size-full">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        
        <Heading level="h2" className="text-3xl leading-10 text-black" data-testid="product-title">
          {product.title}
        </Heading>

        <Text className="text-medium text-black" data-testid="product-description">
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
