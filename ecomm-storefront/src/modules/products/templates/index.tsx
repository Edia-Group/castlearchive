import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense } from "react"
import { Heading, Text } from "@medusajs/ui"
import ProductPrice from "../components/product-price"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import ProductSize from "../components/product-size"
import ButtonProduct from "../components/button-product"
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
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative bg-transparent"
        data-testid="product-container"
      >
        <div className="flex flex-col size-full bg-transparent mr-7">
        <ImageGallery images={product?.images || []} />
        <Heading level="h2" className="text-3xl leading-10 text-white text-center" data-testid="product-title">
          {product.title}
        </Heading>        <Heading level="h2" className="text-3xl leading-10 text-white text-center" data-testid="product-title">
        <ProductPrice product={product} region={region} />
        </Heading>
        </div>
        <div className="flex flex-col size-full bg-transparent ml-18">
        <div className="flex flex-col text-black">
        <div>
        <ProductSize></ProductSize>
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
          </Suspense>

        </div>
        
        </div>
        <div className="mt-6">
        <ProductTabs product={product} />
        </div>
        </div>        
      </div>
      
      <div
        className="content-container my-16 small:my-32"
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
