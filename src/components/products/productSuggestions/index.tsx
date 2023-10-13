import { BlueButton } from '@/components/button/BlueButton';
import { WhiteButton } from '@/components/button/WhiteButton';
import { InvestorProductSmall } from '../smallSize/InvestorProductSmall';
import { CorporateProductSmall } from '../smallSize/CorporateProductSmall';
import {useState} from 'react'
import { DarkRedButton } from '@/components/button/DarkRedButton';

export function ProductSuggestions(){
  const [productSwitch, setProductSwitch] = useState(1)
  const handleSwitch = (number:number) => setProductSwitch(number)
  return(
    <div className="bg-[#f5f5f5] rounded-2xl">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-2">
          <div onClick={() => handleSwitch(1)} className="flex flex-col">
            {productSwitch == 1
            ? <BlueButton items={{item:"Investor", url:""}} />
            : <WhiteButton items={{item:"Investor", url:""}} /> 
            }
          </div>
          <div onClick={() => handleSwitch(2)} className="flex flex-col">
            {productSwitch == 2
            ? <BlueButton items={{item:"Corporate", url:""}} />
            : <WhiteButton items={{item:"Corporate", url:""}} /> 
            }
          </div> 
        </div>

        <div className="flex flex-col gap-2">
          {productSwitch == 1 
          ?
          <>
            <InvestorProductSmall />
            <InvestorProductSmall />
            <InvestorProductSmall />
          </>
          :
          <>
            <CorporateProductSmall />
            <CorporateProductSmall />
            <CorporateProductSmall />
          </>
          }
        </div>

        <div className="flex flex-col mb-3">
          <div>
            {productSwitch == 1 && <DarkRedButton items={{item:"View all", url:"/investor"}} /> }
            {productSwitch == 2 && <DarkRedButton items={{item:"View all", url:"/corporate"}} /> }
          </div>
        </div>
      </div>
    </div>
  )
}