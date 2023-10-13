import img_productSmall from '@/assets/images/product_small.png'
import Image from 'next/image'

export function CorporateProductSmall(){
  return(
    <div className="CorporateProduct w-full">
      <div className="flex items-center gap-2">
        <div className="bg-white p-5">
          <Image
            src={img_productSmall}
            alt="productSmall"
            style={{objectFit:"contain"}}
            className="mx-auto"
            priority
          />
        </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-base">Project name</span>
        <span>Basic information</span>
        <span>Industry</span>
        <span>Budget</span>
        <span>Location: Viet Nam</span>
      </div>
    </div>
    </div>
  )
}