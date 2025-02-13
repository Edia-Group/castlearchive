import { getCollectionsList, getProductsList, getRegion } from "@lib/data"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { Metadata } from "next"
import { Product } from "@medusajs/medusa"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import logo from "@assets/logo.png"

export const metadata: Metadata = {
  title: "CastleArchive",
  description: "Make your ideas come to life",
  openGraph: {
    title: "CastleArchive",
    description: "Make your ideas come to life",
    images: [
      {
        url: logo.src,
        width: 800,
        height: 600,
        alt: "CastleArchive Logo",
      },
    ],
  },
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }
        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

// TODO CONTINUA
const productMetadata = async() => {
  const response = await fetch(`http://localhost:9000/store/products?handle=Black-Magician-Hoodie`, {
    credentials: "include",
    headers: {
      "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
    },
  });

  console.log(await response.json().then(data => data.products[0]));
}

productMetadata()

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {/* <Hero /> */ } 
      <div className="pb-6 bg-default-0">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
