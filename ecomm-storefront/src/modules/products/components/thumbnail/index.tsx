import { Container, clx } from "@medusajs/ui"

import Image from "next/image"
import { Image as MedusaImage } from "@medusajs/medusa"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import React from "react"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: MedusaImage[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  'data-testid'?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  'data-testid': dataTestid
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <Container
      className={clx(
        //"relative w-full overflow-hidden p-4 bg-transparent shadow-transparent rounded-large transition-shadow ease-in-out duration-150",
        "relative w-full h-full overflow-hidden p-0 bg-transparent shadow-transparent",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/16]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <div className="bg-none relative w-full h-full">
      <Image
        src={image}
        alt="Thumbnail"
        className="object-contain hover:scale-105 transition-transform duration-200 bg-transparent"
        draggable={false}
        quality={100}
        sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
        fill
        priority
      />
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
