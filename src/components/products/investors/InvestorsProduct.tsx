
import img_investorProducts from '@/assets/images/product_small.png'
import Image from 'next/image'

export function InvestorsProduct(){
  return(
    <div className="w-full bg-[#f5f5f5] p-5 rounded-2xl">
      <div className="flex items-center gap-2">
        <div className="bg-white p-5">
          <Image
            src={img_investorProducts}
            alt="investorProducts"
            style={{objectFit:"contain"}}
            className="mx-auto"
            priority
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-base">Investor name</span>
          <span>Basic information</span>
          <span>Investment sector</span>
          <span>Budget</span>
          <span>Location: Viet Nam</span>
        </div>
      </div>
    </div>
  )
}