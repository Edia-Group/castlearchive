"use client"

import { ComponentProps, forwardRef } from "react"

import { Button } from "@medusajs/ui"
import { Press_Start_2P } from 'next/font/google'
import image12 from "@assets/image12.png"

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
});

interface ButtonProductProps extends ComponentProps<typeof Button> {
  buttonText?: string
  textClassName?: string
}

const ButtonProduct = forwardRef<HTMLButtonElement, ButtonProductProps>(
  ({ buttonText, children, className = "", textClassName = "", isLoading, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`
          relative 
          min-h-[55px]
          w-[259px] 
          md:w-full
          md:max-w-lg
          p-0
          disabled:opacity-50
          !bg-transparent
          border-0
          outline-0
          ring-0
          !shadow-none
          after:hidden
          before:hidden
          [&>*]:bg-transparent
          [&>*]:border-0
          [&>*]:shadow-none
          hover:bg-transparent
          hover:border-0
          hover:outline-0
          hover:ring-0
          hover:shadow-none
          focus:bg-transparent
          focus:border-0
          focus:outline-0
          focus:ring-0
          focus:shadow-none
          active:bg-transparent
          active:border-0
          active:outline-0
          active:ring-0
          active:shadow-none
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Background frame */}
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-contain select-none pointer-events-none" 
          style={{
            backgroundImage: `url(${image12.src})`,
            imageRendering: 'pixelated'
          }}
        />
        
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black" />
          </div>
        )}
        
        {/* Button content */}
        <div className={`
          relative 
          z-[1] 
          w-full 
          flex 
          items-center 
          justify-center
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}>
          <span className={`
            ${pixelFont.className} 
            uppercase 
            text-black
            px-4
            select-none
            ${textClassName}
          `}>
            {buttonText || children}
          </span>
        </div>
      </Button>
    )
  }
)

ButtonProduct.displayName = "ButtonProduct"
export default ButtonProduct