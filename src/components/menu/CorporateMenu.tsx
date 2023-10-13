import { Checkbox, Input } from 'antd';
import { BlueButton } from '../button/BlueButton';


export function CorporateMenu(){
  return(
    <div className="w-full bg-[#f5f5f5] rounded">
      <div className="py-5">
        <div className="flex flex-col gap-5 px-5">
          <div className="flex flex-col gap-5 border-b-2 pb-5">
            <span className="font-semibold text-lg">Industry</span>
            <div className=""><Checkbox>Apple Export</Checkbox></div>
            <div className=""><Checkbox>Grape Export</Checkbox></div>
            <div className=""><Checkbox>Rice Export</Checkbox></div>
            <div className=""><Checkbox>Manure Export</Checkbox></div>
          </div>
    
          <div className="flex flex-col gap-3 pb-5 border-b-2">
            <span className="font-semibold text-lg">Location</span>
            <Input className="py-2 px-5" placeholder="Enter location" />
          </div>

          <div className="flex flex-col gap-3 pb-5 border-b-2">
            <span className="font-semibold text-lg">Budget</span>
            <Input className="py-2 px-5" placeholder="Enter budget" />
          </div>

          <BlueButton items={{item:"Search", url:""}}/>
        </div>
      </div>
    </div>
  )
}