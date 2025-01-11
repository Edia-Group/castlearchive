import { Heading, Text } from "@medusajs/ui"
import React, { Suspense, useMemo } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ProductActions from "@modules/products/components/product-actions"
import ProductActionsWrapper from "./product-actions-wrapper"
import ProductInfo from "@modules/products/templates/product-info"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import { Region } from "@medusajs/medusa"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { getProductPrice } from "@lib/util/get-product-price"
import { notFound } from "next/navigation"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  const price = useMemo(() => {
    if (!product || !product.id) {
      return null
    }

    const productPrice = getProductPrice({
      product: product,
      region,
    })

    if (!productPrice) {
      return null
    }

    const { variantPrice, cheapestPrice } = productPrice
    return variantPrice || cheapestPrice || null
  }, [product, region])

  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div 
        className="content-container flex flex-col lg:flex-row lg:items-start relative"
        data-testid="product-container"
      >
        {/* Product Image and Info Section */}
        <div className="w-full lg:w-1/2 relative">
          <div className="sticky top-0 lg:top-24">
            <div className="md:px-12 lg:px-16 xl:px-32 pt-4 lg:pt-8">
              <ImageGallery images={product?.images || []} />
            </div>
            <div className="hidden lg:block mt-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-32 space-y-4">
              <Heading 
                level="h2" 
                className="text-3xl leading-10 text-black text-center" 
                data-testid="product-title"
              >
                {product.title}
              </Heading>
              {price && (
                <div className="flex justify-center items-end gap-x-2 text-xl">
                  {price.price_type === "sale" && (
                    <span className="line-through text-ui-fg-muted text-lg">
                      {price.original_price}
                    </span>
                  )}
                  <span
                    className={price.price_type === "sale" ? "text-xl-regular text-red-400" : " text-xl-regular text-blue-400"}
                    data-testid="product-price"
                  >
                    {price.calculated_price}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Product Actions and Details Section */}
        <div className="w-full lg:w-1/2">
          {/* Mobile Product Info */}
          <div className="block lg:hidden mb-6 px-4 sm:px-8">
              <Heading 
                    level="h2" 
                    className="text-3xl leading-10 text-black text-center" 
                    data-testid="product-title"
                >
                {product.title}
              </Heading>

              {price && (
                <div className="flex justify-center items-end gap-x-2 text-xl">
                  {price.price_type === "sale" && (
                    <span className="line-through text-ui-fg-muted text-lg">
                      {price.original_price}
                    </span>
                  )}
                  <span
                    className={price.price_type === "sale" ? "text-xl-regular text-red-400" : " text-xl-regular text-blue-400"}
                    data-testid="product-price"
                  >
                    {price.calculated_price}
                  </span>
                </div>
              )}
          </div>
          
          <div className="sticky top-0 lg:top-24 space-y-8 px-4 sm:px-8 md:px-12 lg:px-16">
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
              <Text className="text-medium text-black" data-testid="product-description">
                {product.description}
              </Text>
              <ProductTabs product={product} />
            </Suspense>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      <div
        className="content-container my-8 lg:my-16"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate