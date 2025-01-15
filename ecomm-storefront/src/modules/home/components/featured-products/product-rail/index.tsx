import InteractiveLink from "@modules/common/components/interactive-link"
import { ProductCollectionWithPreviews } from "types/global"
import ProductPreview from "@modules/products/components/product-preview"
import { Region } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

export default function ProductRail({
  collection,
  region,
}: {
  collection: ProductCollectionWithPreviews
  region: Region
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="content-container pb-2 pl-2 pr-2">
      <div className="flex justify-between mb-8">
        {/*
        <Text className="txt-xlarge">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
        */}
      </div>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-10 m-7 small:grid-cols-2 small:gap-y-36">
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <ProductPreview
                productPreview={product}
                region={region}
                isFeatured
                showAddToCartButton={true}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
