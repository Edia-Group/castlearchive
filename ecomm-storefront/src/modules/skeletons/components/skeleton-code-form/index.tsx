const SkeletonCodeForm = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-def-0 h-7 w-24 mb-4"></div>
      <div className="grid grid-cols-[1fr_80px] gap-x-2">
        <div className="bg-def-0 h-12"></div>
        <div className="bg-def-0 h-12"></div>
      </div>
    </div>
  )
}

export default SkeletonCodeForm
