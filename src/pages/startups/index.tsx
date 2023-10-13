import UsersLayout from '@/layouts/users/UsersLayout';
import img_bannerCorporate from '@/assets/images/banner-corporate.png'
import Image from 'next/image';
import { CorporateMenu } from '@/components/menu/CorporateMenu';
import { Pagination, Select } from 'antd';
import { StartupsProduct } from '@/components/products/startups/StartupsProduct';

export default function StartupsPage(){
  return(
    <UsersLayout>
      <div className="main">
        <div className="relative">
          <Image
            src={img_bannerCorporate}
            alt=""
            style={{objectFit:"contain", width:"100%"}}
          />
          <div className="absolute top-2/4 left-2/4 z-10 -translate-x-2/4 -translate-y-2/4">
            <div className="text-center w-[38rem]">
              <div className="text-white font-semibold text-3xl mb-3">Investment Projects</div>
              <p className="text-white opacity-75 text-center">Searching for long-term suitable investment projects with industries and fields that increase the amount exponentially</p>
            </div>
          </div>
        </div>
        
        <div className="general-wrapper ">
          <div className="flex items-start py-5">
            <div className="w-[18.75rem] flex justify-between gap-2">
              <CorporateMenu />
            </div>

            <div className="flex-1 ml-5">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center bg-[#f5f5f5] p-5 rounded">
                  <span>There are a total of 10 records</span>
                  <div><Pagination defaultCurrent={1} total={50} /></div>
                  <div className="flex items-center gap-2">
                    <Select
                      className="max-w-[15rem] min-w-[10rem] "
                      defaultValue="All"
                      options={[
                        { value: 'All', label: 'All' },
                        { value: 'ABC', label: 'ABC' }
                      ]}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <StartupsProduct />
                  <StartupsProduct />
                  <StartupsProduct />
                  <StartupsProduct />
                  <StartupsProduct />
                  <StartupsProduct />
                </div>

                <div className="flex justify-between items-center bg-[#f5f5f5] p-5 rounded">
                  <span>There are a total of 10 records</span>
                  <div><Pagination defaultCurrent={1} total={50} /></div>  
                  <div className="flex items-center gap-2">
                    <Select
                      className="max-w-[15rem] min-w-[10rem] "
                      defaultValue="All"
                      options={[
                        { value: 'All', label: 'All' },
                        { value: 'ABC', label: 'ABC' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UsersLayout>
  )
}