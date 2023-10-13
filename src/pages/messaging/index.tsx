import { MessagingMenu } from "@/components/menu/MessagingMenu";
import { ProductSuggestions } from "@/components/products/productSuggestions";
import { UsersLayoutFixed } from "@/layouts/users/UsersLayout";
import Image from "next/image";
import img_avatarUser from '@/assets/images/avatar_fake_user.gif'
import { Input } from "antd";

export default function MessagingPage(){
  return(
    <UsersLayoutFixed>
      <div className="main flex flex-1">
        <div className="general-wrapper flex h-full flex-1">
          <div className="flex items-start my-4 flex-1">
            <div className="w-[18.75rem] h-full relative">
              <MessagingMenu />
            </div>

            <div className="flex-1 px-5 h-full">
              <div className="bg-[#f5f5f5] rounded-2xl py-5 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 pb-5 border-b-2 px-5">
                    <Image
                      src={img_avatarUser}
                      alt=""
                      width={50}
                      priority
                      style={{objectFit:"contain"}}
                      className="rounded-full"
                    />
                    <span>Nguyen Duc Huy</span>
                  </div>

                  <div className="p-5 flex flex-col gap-5 flex-1">
                    <p className="text-center text-[#5e6e7f]">17 Th08 2023, 12:04</p>

                    <div className="flex items-center gap-3 justify-start">
                      <Image
                        src={img_avatarUser}
                        alt=""
                        width={50}
                        priority
                        style={{objectFit:"contain"}}
                        className="rounded-full"
                      />
                      <div className="bg-white">
                      <span className="py-3 px-5 bg-white rounded ">Hello</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <span className="py-3 px-5 bg-white rounded ">Hello</span>
                    </div>

                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="border-t-2 flex items-center px-5 pt-5">
                      <Input 
                        className="flex-1 rounded-full p-3 px-5"
                        placeholder="Send a message"
                        suffix={
                          <div>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              fill="currentColor" 
                              className="bi bi-send cursor-pointer" 
                              viewBox="0 0 16 16"
                            > 
                              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                             </svg>
                          </div>
                        }
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="w-[18.75rem]">
              <ProductSuggestions />
            </div>
          </div>
        </div>
      </div>
    </UsersLayoutFixed>
  )
}