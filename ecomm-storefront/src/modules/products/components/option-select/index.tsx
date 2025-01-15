import { ProductOption } from "@medusajs/medusa"
import React from "react"
import { clx } from "@medusajs/ui"
import { onlyUnique } from "@lib/util/only-unique"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
  disabled: boolean
  "data-testid"?: string
  isAdding?: boolean
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
  isAdding,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-col gap-y-4">
      <div 
        className="flex gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption({ [option.id]: v })}
              key={v}
              className={clx(
                "w-12 h-12 rounded-lg flex items-center justify-center text-base font-medium",
                "bg-[#f3e6d4] border-2 border-[#e6d5bd] shadow-sm",
                {
                  "border-[#9f8e73] bg-[#edddc5]": v === current,
                  "hover:bg-[#edddc5] transition-colors duration-150": !disabled && v !== current,
                  "opacity-50 cursor-not-allowed": disabled
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect