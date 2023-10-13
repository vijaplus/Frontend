//import library
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react"

//import function component
import { BlueButton } from "../button/BlueButton";
import { ROUTES } from "@/common/routes";
import { checkAvatar } from "@/utils/checkAvatar";

//import image
import img_avatarDefault from '@/assets/images/avatar_user_default.png'

interface props {
  content: any,
}

export function VerticalMenuProfile(props:props){
  const {content} = props

  const userData:any = useSelector((state:RootState) => state.userReducer.setUserInfo)
  const [userInfo, setUserInfo] = useState(userData)
  const [statusPage, setStatusPage] = useState("pending")
  const [blockRenderFirst, setBlockRenderFirst] = useState(true)

  useEffect(() =>{
    setBlockRenderFirst(false)
  },[])
  
  useEffect(() =>{
    if(!blockRenderFirst){
      setUserInfo(userData)
      setStatusPage("success")
    }
  },[blockRenderFirst, userData])
  
  if(statusPage == "pending") return

  return(
    <div className="VerticalMenu w-full bg-[#f5f5f5] rounded-2xl">
      <div className="flex flex-col py-5">
        {!userInfo
        ?
        <div className="info flex flex-col justify-center items-center gap-5">
          <Image
            src={img_avatarDefault}
            alt="avatar"
            width={75}
            priority
            style={{objectFit:"contain"}}
            className="rounded-full"
          />
          <div className="">
            <BlueButton items={{item: content("home:verticalMenuProfile.loginWithAccount"), url: ROUTES.LOGIN}}/>
          </div>
        </div>
        :
        <div className="info flex flex-col justify-center items-center gap-5">
          <Image
            src={checkAvatar(userInfo.avatar)}
            alt="avatar"
            width={75}
            priority
            style={{objectFit:"contain"}}
            className="rounded-full"
          />
          <span>{userInfo.company_name}</span>
        </div>
        }
      </div>
    </div>
  )
}