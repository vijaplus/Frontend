import { withAuth } from '@/utils/withAuth';
export const getServerSideProps = withAuth(["login", "header", "messageValid", "messageBackend"])

//import library
import { Pagination, Select } from 'antd';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

//import function component
import { UsersLayout } from '@/layouts/users/UsersLayout';
import img_bannerInvestor from '@/assets/images/banner-investors.png'
import { BlueButton } from '@/components/button/BlueButton';
import { InvestorsProduct } from '@/components/products/investors/InvestorsProduct';

export default function InvestorsPage(){
  const { t } = useTranslation();
  return(
    <UsersLayout content = {t}>
      <div className="main">
        <Image
          src={img_bannerInvestor}
          alt=""
        />
        <div className="general-wrapper">
          <p className="text-3xl font-semibold text-center my-8">Looking For Investors</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">

              <div className="flex items-center gap-2">
                <span className="font-semibold">Selecting an investor</span>
                <Select
                  className="max-w-[15rem] py-2 min-w-[10rem]"
                  defaultValue="ABC"
                  options={[
                    { value: 'ETF', label: 'ETF' },
                    { value: 'ABC', label: 'ABC' }
                  ]}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Budget</span>
                <input type="text" placeholder="Enter budget" className="outline-none border py-2 px-5 rounded max-w-[15rem]" />
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">Location</span>
                <Select
                  className="max-w-[15rem] py-2 min-w-[10rem]"
                  defaultValue="DN"
                  options={[
                    { value: 'HCM', label: 'Ho Chi Minh' },
                    { value: 'DN', label: 'Da Nang' },
                    { value: 'HN', label: 'Ha Noi' }
                  ]}
                />
              </div>
            </div>

            <div><BlueButton items={{item:"Search", url:""}}/></div>
          </div>
          <div className="flex flex-col gap-5 py-5">
            <div className="flex justify-between mt-5">
              <span>There are a total of 10 records</span>
              <div>
                <Pagination  defaultCurrent={1} total={50} />
              </div>
            </div>
            
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <InvestorsProduct />
                <InvestorsProduct />
              </div>

              <div className="flex items-center gap-5">
                <InvestorsProduct />
                <InvestorsProduct />
              </div>

              <div className="flex items-center gap-5">
                <InvestorsProduct />
                <InvestorsProduct />
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <span>There are a total of 10 records</span>
              <div>
                <Pagination  defaultCurrent={1} total={50} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UsersLayout>
  )
}