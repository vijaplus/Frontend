import { ProductSuggestions } from '@/components/products/productSuggestions';
import UsersLayout from '@/layouts/users/UsersLayout';
import Image from 'next/image';
import img_avatarUser from '@/assets/images/avatar_fake_user.gif'
import { CreatePosts } from '@/components/posts/CreatePosts';
import { Posts } from '@/components/posts/Posts';
import { useState } from 'react';
import { InvestorsProduct } from '@/components/products/investors/InvestorsProduct';
import { Input } from 'antd';
import { FollowButton } from '@/components/button/FollowButton';
import { BlueButton } from '@/components/button/BlueButton';
import { ROUTES } from '@/common/routes';

const ActiveButton = ({id, text, setConvert }: { id:number, text: string, setConvert: (arg: number) => void }) => {
  const handleConverted = (id:number) => setConvert(id)
  return(
    <div 
      className="border-b-4 border-b-blue-500 px-7 py-3 cursor-pointer"
      onClick={()=>{handleConverted(id)}}
    >
      <span className="text-blue-500 font-semibold">{text}</span>
    </div>
  )
}

const InactiveButton = ({ id, text, setConvert }: { id:number, text: string, setConvert: (arg: number) => void }) => {
  const handleConverted = (id:number) => setConvert(id)
  return(
    <div 
      className="border-b-4 border-b-transparent px-7 py-3 cursor-pointer"
      onClick={()=>{handleConverted(id)}}
    >
      <span>{text}</span>
    </div>
  )
}

export default function ViewUserPage(){
  const [convert, setConvert] = useState<number>(1)
  return(
    <UsersLayout>
      <div className="main">
        <div className="general-wrapper">
          <div className="flex items-start py-5">
            <div className="w-[18.75rem]"></div>

            <div className="flex-1 px-5">
              <div className="flex flex-col gap-5">
                <div className="rounded-2xl bg-[#f5f5f5] py-5 flex flex-col px-5">
                  <div className="flex justify-between items-center border-b-2 pb-5">
                    <div className="flex items-center gap-3">
                    <Image
                        src={img_avatarUser}
                        alt=""
                        width={100}
                        priority
                        style={{objectFit:"contain"}}
                        className="rounded-full"
                      />
                      <div className="flex flex-col gap-3">
                        <span className="font-semibold">Nguyen Duc Huy</span>
                        <div className="flex justify-center">
                          <BlueButton items={{item:"Message", url: ROUTES.MESSAGING}} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-5">
                        <div className="flex flex-col justify-center items-center gap-2">
                          <p>Follower</p>
                          <p>70 N</p>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-2">
                          <p>Following</p>
                          <p>20 N</p>
                        </div>
                      </div>
                      <div className="">
                        <FollowButton items={{item:"+ Follow"}} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {convert == 1
                    ?  <ActiveButton id={1} text={"Posts"} setConvert={setConvert}/>
                    :  <InactiveButton id={1} text={"Posts"} setConvert={setConvert}/>
                    }
                    {convert == 2
                    ?  <ActiveButton id={2} text={"Jobs"} setConvert={setConvert}/>
                    :  <InactiveButton id={2} text={"Jobs"} setConvert={setConvert}/>
                    }
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  {convert == 1
                  && <>
                      <Posts />
                      <Posts />
                      <Posts />
                      <Posts />
                      <Posts />
                      <Posts />
                      <Posts />
                    </>
                  }
                  {convert == 2
                  && <>
                      <InvestorsProduct />
                      <InvestorsProduct />
                      <InvestorsProduct />
                      <InvestorsProduct />
                      <InvestorsProduct />
                      <InvestorsProduct />
                      <InvestorsProduct />
                    </>
                  }
                </div>
              </div>
            </div>

            <div className="w-[18.75rem]">
              <ProductSuggestions />
            </div>
        </div>
        </div>
      </div>

    </UsersLayout>
  )
}