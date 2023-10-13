import { ProductSuggestions } from '@/components/products/productSuggestions';
import UsersLayout from '@/layouts/users/UsersLayout';
import Image from 'next/image';
import img_avatarUser from '@/assets/images/avatar_fake_user.gif'
import { CreatePosts } from '@/components/posts/CreatePosts';
import { Posts } from '@/components/posts/Posts';
import { useState } from 'react';
import { InvestorsProduct } from '@/components/products/investors/InvestorsProduct';
import { Input } from 'antd';

const ActiveButton = ({ id, text, setConvert }: { id: number, text: string, setConvert: (arg: number) => void }) => {
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

const InactiveButton = ({ id, text, setConvert }: { id: number, text: string, setConvert: (arg: number) => void }) => {
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

const FollowedActive = () => {
  return(
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
        <Image
          src={img_avatarUser}
          alt=""
          width={50}
          priority
          style={{objectFit:"contain"}}
          className="rounded-full"
        />
        <p className="font-semibold">Nguyen Duc Huy</p>
        </div>
        <div className="">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" 
            fill="currentColor" 
            className="bi bi-three-dots cursor-pointer" 
            viewBox="0 0 16 16"
          > 
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/> 
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage(){
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
                      <span className="font-semibold">Nguyen Duc Huy</span>
                    </div>
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
                  </div>
                  <div className="flex items-center">
                    {convert == 1
                    ?  <ActiveButton id={1} text={"Posts"} setConvert={setConvert}  />
                    :  <InactiveButton id={1} text={"Posts"} setConvert={setConvert} />
                    }
                    {convert == 2
                    ?  <ActiveButton id= {2} text={"Jobs"} setConvert={setConvert} />
                    :  <InactiveButton id={2} text={"Jobs"} setConvert={setConvert} />
                    }
                    {convert == 3
                    ?  <ActiveButton id={3} text={"Followed"} setConvert={setConvert}  />
                    :  <InactiveButton id={3} text={"Followed"} setConvert={setConvert}  />
                    }
                  </div>
                </div>

                <div className="border-b-2 pb-5">
                  <CreatePosts />
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
                  {convert == 3
                  && <div className="bg-[#f5f5f5] rounded-2xl py-5 flex flex-col gap-5">
                    <div className="flex items-center justify-between px-5">
                      <div className="flex-1">
                        <Input 
                          placeholder="Search by name" 
                          className="py-2 w-4/5"
                          suffix={
                            <div>
                              <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                width="16" 
                                height="16" 
                                fill="currentColor" 
                                className="bi bi-search cursor-pointer" 
                                viewBox="0 0 16 16"
                              > 
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                              </svg>
                            </div>
                          }
                        />
                      </div>
                      <div className="flex-1"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="border flex-1 mx-5 px-5 py-3 rounded-2xl">
                        <FollowedActive />
                      </div>
                      <div className="border flex-1 mx-5 px-5 py-3 rounded-2xl">
                        <FollowedActive />
                      </div>
                    </div>
      
                    <div className="flex items-center">
                      <div className="border flex-1 mx-5 px-5 py-3 rounded-2xl">
                        <FollowedActive />
                      </div>
                      <div className="border flex-1 mx-5 px-5 py-3 rounded-2xl">
                        <FollowedActive />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="border flex-1 mx-5 px-5 py-3 rounded-2xl">
                        <FollowedActive />
                      </div>
                      <div className="border flex-1 mx-5 px-5 py-3 rounded-2xl">
                        <FollowedActive />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="border flex-1 mx-5 px-5 py-3 rounded-2xl">
                        <FollowedActive />
                      </div>
                      <div className="border flex-1 mx-5 px-5 py-3 rounded-2xl">
                        <FollowedActive />
                      </div>
                    </div>

                    </div>
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