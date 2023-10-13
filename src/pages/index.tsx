import { withAuth } from '@/utils/withAuth';
export const getServerSideProps = withAuth(["home", "header", "messageValid", "messageBackend"])

//import library
import { useTranslation } from 'next-i18next';
import  { useState, useEffect, memo } from "react"
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from 'react-redux';

//import function component
import { VerticalMenuProfile } from '@/components/menu/VerticalMenuProfile';
import { CreatePosts } from '@/components/posts/CreatePosts';
import { Posts } from '@/components/posts/Posts';
import { ProductSuggestions } from '@/components/products/productSuggestions';
import { UsersLayout } from '@/layouts/users/UsersLayout';
import { setUserInfo } from '@/redux/features/user/userSlice';
import { ResponseType } from '@/@types/response';
import AuthApiAdapter from '@/api/auth';

//code main
interface props{
  globalUserInfo: ResponseType
}

function Home(props:props){  
  const { globalUserInfo } = props
  const { t } = useTranslation();

  const dispatch = useDispatch()
  const userData:any = useSelector((state:RootState) => state.userReducer.setUserInfo)
  const [userDataInfo, setUserDataInfo] = useState(userData)
  const [statusPage, setStatusPage] = useState("pending")
  const [blockRenderFirst, setBlockRenderFirst] = useState(true)
  const [businessType, setBusinessType] = useState([])

  useEffect(() => {
    setBlockRenderFirst(false)
  },[blockRenderFirst])

  useEffect(() =>{
    if(blockRenderFirst) return
    dispatch(setUserInfo(globalUserInfo))
    setUserDataInfo(userData)
    setStatusPage("success")    
  },[blockRenderFirst, dispatch, userData, globalUserInfo])
  
  useEffect(() =>{
    if(blockRenderFirst) return
    AuthApiAdapter.get("business-type")
      .then( res => {
        setBusinessType(res.data)
      })
  },[blockRenderFirst])

  if(statusPage === "pending") return 
  console.log(businessType)
  return (
    <UsersLayout content={t} userDataInfo={userDataInfo} >
      <div className="main py-5 ">
        <div className="general-wrapper flex items-start">
          <div className="w-[18.75rem] flex justify-between gap-2">
            <VerticalMenuProfile content ={t}  />
          </div>

          <div className="flex-1 px-5 flex flex-col gap-5">
            <div className="hashtag flex flex-col bg-[#f5f5f5] p-5 rounded-2xl gap-5">
              {businessType.map( (type:any) => {
                return(
                  <div className="flex gap-5 items-start flex-col" key={type.id}>
                    <span className="font-semibold text-lg capitalize">{type.name}</span>
                    <div className="flex items-center gap-5 flex-wrap">
                      <div 
                        className= {
                          type.id == 1
                        ? "bg-blue-500 px-5 py-3 rounded cursor-pointer font-semibold text-white"
                        : "bg-white px-5 py-3 rounded cursor-pointer"
                        }
                      >
                        Tất cả
                      </div>
                      {type.items.map( (item:any) => {
                        return(
                          <div key={item.id}>
                            <div className="bg-white px-5 py-3 rounded cursor-pointer">{item.name}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            {!!userDataInfo
            &&  
            <div className="">
              <CreatePosts content ={t} userDataInfo={userDataInfo} />
            </div>
            }
            <div className="flex flex-col gap-5">
              <Posts />
              <Posts />
              <Posts />
              <Posts />
              <Posts />
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

export default memo(Home)