import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth(["authEmail", "header", "messageValid", "messageBackend"])

//import library
import { Button, Form, Input } from "antd";
import { useTranslation } from "next-i18next";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//import function component
import { UsersLayout } from "@/layouts/users/UsersLayout";
import { Notification } from "@/components/notification";
import { ROUTES } from '@/common/routes';
import AuthApiAdapter from '@/api/auth'
import { setUserInfo } from '@/redux/features/user/userSlice';
import { ResponseType } from '@/@types/response';
import { AuthEmailRequest, ResendOTPRequestUserId } from '@/@types/request';

//code main
export default function AuthEmail(){

  const router = useRouter()
  const userData:any = useSelector((state:RootState) => state.userReducer.setUserInfo)
  const [statusPage, setStatusPage] = useState("pending")
  const [blockRenderFirst, setBlockRenderFirst] = useState(true)

  useEffect(() => {
    setBlockRenderFirst(false)
  },[])  

  useEffect(() =>{
    if(blockRenderFirst) return 
    if(!userData) {
      router.push(ROUTES.LOGIN)
    }else{
      setStatusPage("success")
      AuthApiAdapter.post<ResendOTPRequestUserId, ResponseType>("send-otp-register", { "user_id": userData.id })
    }
  },[blockRenderFirst, userData, router])

  const { t } = useTranslation();
  const { contextHolder, openNotificationWithIcon} = Notification()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [blockTime, setBlockTime] = useState(0)
  const [allowThreeTime , setAllowThreeTime] = useState(0)
  
  if(statusPage === "pending") return 

  const handleResendOTP = () => {
    setBlockTime(0)
    setAllowThreeTime((preTime) => preTime + 1)
    if(allowThreeTime >= 4){
      setAllowThreeTime(0)
      setBlockTime(15)
    }  
    setIsLoading(true)
    AuthApiAdapter.post<ResendOTPRequestUserId, ResponseType>("send-otp-register", { "user_id": userData.id })
      .then(res => {
        openNotificationWithIcon("success", t("messageBackend:success"), t("messageBackend:otp_sent"))
      }).finally(() => {
        setIsLoading(false)
      })
  }

  if(blockTime >0 && blockTime <= 15) {
     setTimeout(() => {
      setBlockTime(blockTime - 1)
    }, 1000)
  }
  
  const onFinishAuthEmail = (value:AuthEmailRequest) => {
    setIsLoading(true)
    AuthApiAdapter.post<AuthEmailRequest, ResponseType>("verify-register",{
      "user_id": userData.id,
      "code_otp": value.code_otp
    }).then(res => {
      if(!res.status) return openNotificationWithIcon("error", t("messageBackend:fail"), t(res.errors) );
      const expires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
      document.cookie = "accessToken=" +res.data.token+ ";expires=" + expires.toUTCString() + ";path=/"
      document.cookie = "userRole=" +res.data.user.company_type+ ";expires=" + expires.toUTCString() + ";path=/"
      dispatch(setUserInfo(res.data.user))
      router.push(ROUTES.HOME)
    }).finally(() =>{
      setIsLoading(false)
    })
  }  

  return(
    <UsersLayout content= {t} userDataInfo={null}>
      {contextHolder}
      <div className="main flex-1">
        <div className="general-wrapper flex flex-col justify-center items-center min-h-screen">
          <div className="bg-[#f5f5f5] p-5 rounded-2xl -translate-y-2/4">
            <p className="font-semibold text-3xl mb-5">{t("authEmail:title")}</p>
            <Form
              onFinish={onFinishAuthEmail}
            >
              <Form.Item<AuthEmailRequest>
                name="code_otp"
                rules={[
                  {
                    required:true,
                    message:t("messageValid:otp_cannot_be_empty")
                  }
                ]}
              >
                <Input
                  placeholder={t("messageValid:placeholder_otp")}
                  max={6} 
                  style={{width:"432px"}}
                  size="large"
                  suffix={
                    <>
                    {!blockTime
                    ?
                      <div className="cursor-pointer" onClick={handleResendOTP}>
                        <span className="text-blue-500">{t("authEmail:reSendOTP")}</span>
                      </div>
                    :
                      <div className="cursor-pointer">
                        <span className="text-gray-300">{t("authEmail:sendAgainLater")} {blockTime}s</span>
                      </div>
                    }
                    </>
                  }
                /> 
              </Form.Item>

              <p className="text-red-500 mb-5 text-center">{t("authEmail:sentOTP")}</p>
               
              <div className="flex w-full">
                   <Button 
                    htmlType="submit"
                    style={{
                      width:"100%",
                      padding:"25px 0",
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      cursor:!!isLoading || !!blockTime ? "not-allowed" : "pointer",
                      background: "#3b82f6",
                      opacity: !!isLoading || !!blockTime ? "0.5" : "1",
                      color:"white",
                    }}
                    size='large'
                    disabled={!!isLoading || !!blockTime ? true : false}
                  >{t("authEmail:confirm")}
                  </Button>
                </div>
             </Form>
          </div>
        </div>
      </div>
    </UsersLayout>
  )
}