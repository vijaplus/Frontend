//import library
import Image from 'next/image'
import Link from 'next/link'
import { memo, useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

//import function components
import { HorizontalNav } from '../navbars/HorizontalNav'
import { BlueButton } from '@/components/button/BlueButton'
import { SearchTopModal } from '../modals/SearchTopModal'
import { LanguageTopModal } from '../modals/LanguageTopModal'
import { ROUTES } from '@/common/routes';
import { checkAvatar } from '@/utils/checkAvatar'
import { UserInfoHeaderModal } from '../modals/UserInfoHeaderModal'

//import image
import img_logo from '@/assets/images/logo.png'
import img_flagVn from '@/assets/images/flag_vn.png'
import img_flagJp from '@/assets/images/flag_jp.png'
import img_language from '@/assets/images/language.png'
//
interface props {
  content: any,
  userDataInfo: any
}

function UserHeader(props: props){
  
  const {content, userDataInfo} = props

  const menuItems = [
    {
      item:content("header:nav.home"),
      url: ROUTES.HOME,
    },
    {
      item:content("header:nav.investors"),
      url: ROUTES.INVESTORS,
    },
    {
      item:content("header:nav.startups"),
      url: ROUTES.STARTUPS,
    },
    {
      item:content("header:nav.messaging"),
      url: ROUTES.MESSAGING,
    },
    {
      item:content("header:nav.notifications"),
      url:ROUTES.NOTIFICATIONS,
    },
  ]

  return(
    <section className="header sticky left-0 right-0 top-0 shadow-md z-50 bg-white">
        <div className="header__wrapper general-wrapper">
          <div className="header__main flex items-center py-4 gap-5">
            <div className="w-[18.75rem] flex justify-between gap-2">
              <Image 
                src={img_logo}
                alt="logo"
                width={50}
                priority 
              />
              <div className="flex gap-2 items-center">
                <Image
                  src={img_flagVn}
                  alt="flagVn"
                  width={24}
                  priority 
                />
                <Image
                  src={img_flagJp}
                  alt="flagJp"
                  width={24}
                  priority 
                />
              </div>
            </div>

            <div className="flex-1 flex self-stretch items-center justify-around">
              <HorizontalNav items={menuItems} />
              <div className="flex h-full items-center">
                <div className="relative group/searchTop h-full flex items-center cursor-pointer px-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" 
                    height="20" 
                    fill="#000" 
                    className="bi bi-search cursor-pointer" 
                    viewBox="0 0 16 16"
                  > 
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                  <div className="hidden group-hover/searchTop:block">
                    <SearchTopModal content={content} />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[18.75rem] flex justify-between gap-2 self-stretch">
              <>
                {!userDataInfo 
                ?
                <div className="flex gap-2 items-center">
                  <div className="flex">
                    <Link href={ROUTES.LOGIN} className="hover:bg-blue-50 rounded px-5 py-3 cursor-pointer">{content("header:login")}</Link>
                  </div>
                  <div className="flex">
                    <BlueButton items={{item:content("header:register"), url:ROUTES.REGISTER}} />
                  </div>
                </div>
                :
                <div className="flex gap-2 items-center cursor-pointer group/userInfo relative">
                  <Image 
                    src={checkAvatar(userDataInfo.avatar)}
                    alt="avatar"
                    width={50}
                    priority
                  />
                  <span>{userDataInfo.company_name}</span>

                  <div>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="12" 
                      height="12" 
                      fill="currentColor" 
                      className="bi bi-chevron-up group-hover/userInfo:rotate-180" 
                      viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                  </div>
                  <div className="hidden group-hover/userInfo:block">
                    <UserInfoHeaderModal />
                  </div>
                </div>
                }
              </>

              <div className="flex items-center relative group/languageTop">
                <div className="flex items-center gap-2">
                <Image 
                  src={img_language}
                  alt="language"
                  width={24}
                  priority 
                 />
                <span>{content("header:language")}</span>
                </div>
                <div className="hidden group-hover/languageTop:block">               
                  <LanguageTopModal />
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default memo(UserHeader)