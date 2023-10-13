import { withAuth } from '@/utils/withAuth';
export const getServerSideProps = withAuth(["", "header", "messageValid", "messageBackend"])

import { SearchUserMenu } from '@/components/menu/SearchUserMenu';
import { ProductSuggestions } from '@/components/products/productSuggestions';
import { InvestorsProduct } from '@/components/products/investors/InvestorsProduct';
import { StartupsProduct } from '@/components/products/startups/StartupsProduct';
import { Posts } from '@/components/posts/Posts';
import { UsersLayout } from '@/layouts/users/UsersLayout';
import { useTranslation } from 'react-i18next';

export default function SearchPage(){
    const { t } = useTranslation();

  return(
    <UsersLayout content = {t} userInfoGlobals={null}>
      <div className="main py-5">
        <div className="general-wrapper flex items-start">
          <div className="w-[18.75rem]">
            <SearchUserMenu />
          </div>

          <div className="flex-1 px-5">
            <div className="flex flex-col gap-5">
              
              <div className="py-5 flex flex-col bg-[#f5f5f5] rounded-2xl">
                <span className="font-semibold text-lg px-5">All investors</span>
                <div className="border-b-2 cursor-pointer">
                  <InvestorsProduct />
                </div>
                <div className="border-b-2 cursor-pointer">
                  <InvestorsProduct />
                </div>
                <div className="border-b-2 cursor-pointer">
                  <InvestorsProduct />
                </div>
              </div>

              <div className="py-5 flex flex-col bg-[#f5f5f5] rounded-2xl">
                <span className="font-semibold text-lg px-5">All startups</span>
                <div className="border-b-2 cursor-pointer">
                  <StartupsProduct />
                </div>
                <div className="border-b-2 cursor-pointer">
                  <StartupsProduct />
                </div>
                <div className="border-b-2 cursor-pointer">
                  <StartupsProduct />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <span className="font-semibold text-lg">All Posts</span>
                <Posts />
                <Posts />
                <Posts />
                <Posts />
                <Posts />
              </div>
            </div> 
          </div>

          <div className="w-[18.75rem]">
            <ProductSuggestions />
          </div>
        </div>
      </div>
    </UsersLayout>
  )
}