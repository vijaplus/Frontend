import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth(["", "header", "messageValid", "messageBackend"])

//import library
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { Button, Form, Input } from "antd";
import { useState, useEffect } from "react";
import Link from "next/link";

//import function component
import { UsersLayout } from "@/layouts/users/UsersLayout";
import { Notification } from "@/components/notification";
import AuthApiAdapter from "@/api/auth";
import { ResponseType } from "@/@types/response";
import { ROUTES } from "@/common/routes";
import { AuthForgotPasswordRequest, ForgotPasswordRequest } from "@/@types/request";
import { setUserInfo } from "@/redux/features/user/userSlice";

//code main
export default function AuthForgotPassword(){

  const router = useRouter()
  const userData:any = useSelector((state:RootState) => state.userReducer.setUserInfo)
  const [statusPage, setStatusPage] = useState("pending")

  useEffect(() =>{
    if(!userData) {
      router.push(ROUTES.FORGOT_PASSWORD)
    }else{
      setStatusPage("success")
    }
  },[userData, router])

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
    AuthApiAdapter.post<ForgotPasswordRequest,ResponseType>("send-otp-forgot-password", {
      "email": userData.email
    })
      .then(res => {
        openNotificationWithIcon("success", t("messageBackend:success"), t("messageBackend:otp_sent") )
      }).finally(() => {
        setIsLoading(false)
      })
  }

  if(blockTime >0 && blockTime <= 15) {
    setTimeout(() => {
      setBlockTime(blockTime - 1)
    }, 1000)
  }

  const onFinishAuth = (value:AuthForgotPasswordRequest) => {
    AuthApiAdapter.post<AuthForgotPasswordRequest,ResponseType>("verify-forgot-password", {
      "user_id": userData.id,
      "code_otp": value.code_otp
    }).then(res =>{
      if(!res.status) return openNotificationWithIcon("error", t("messageBackend:fail"), t(res.errors) );
      dispatch(setUserInfo(res.data))
      router.push(ROUTES['FORGOT_PASSWORD/RESET'])
    })
  }

  return(
    <UsersLayout content={t} userDataInfo={null}>
    {contextHolder}
    <div className="main flex-1">
      <div className="general-wrapper flex flex-col justify-center items-center min-h-screen">
        <div className="bg-[#f5f5f5] p-5 rounded -translate-y-1/4">
          <div className="font-semibold text-3xl mb-6 flex items-center justify-between">
            <span>Xác minh bảo mật</span>
            <Link href={ROUTES.FORGOT_PASSWORD} className="cursor-pointer">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24" 
                fill="currentColor" 
                className="bi bi-x" 
                viewBox="0 0 16 16"> 
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/> 
              </svg>
            </Link>
          </div>
          <div className="text-base flex items-center gap-1 mb-6">
            <div className="flex items-center gap-2">
              <div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  zoomAndPan="magnify" 
                  viewBox="0 0 30 30.000001" 
                  height="24" 
                  preserveAspectRatio="xMidYMid meet" 
                  version="1.0">
                  <defs>
                    <clipPath id="id1">
                      <path d="M 3.460938 6.5625 L 26.539062 6.5625 L 26.539062 24.707031 L 3.460938 24.707031 Z M 3.460938 6.5625 " clipRule="nonzero"/>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#id1)">
                    <path fill="rgb(6.269836%, 5.879211%, 5.099487%)" d="M 24.230469 11.101562 L 15 16.769531 L 5.769531 11.101562 L 5.769531 8.832031 L 15 14.503906 L 24.230469 8.832031 Z M 24.230469 6.5625 L 5.769531 6.5625 C 4.492188 6.5625 3.472656 7.578125 3.472656 8.832031 L 3.460938 22.441406 C 3.460938 23.695312 4.492188 24.707031 5.769531 24.707031 L 24.230469 24.707031 C 25.507812 24.707031 26.539062 23.695312 26.539062 22.441406 L 26.539062 8.832031 C 26.539062 7.578125 25.507812 6.5625 24.230469 6.5625 " fillOpacity="1" fillRule="nonzero"/>
                  </g>
                </svg>
              </div>
              <div>A verification code will be sent to {userData.email}</div>
            </div>
           </div>
          <Form
            onFinish={onFinishAuth}
          >
          <Form.Item<AuthForgotPasswordRequest>
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
            style={{
              minWidth:"575px", 
              width:"100%"
            }}
            size="large"
            suffix={
              <>
                {!blockTime
                  ?
                   <div className="cursor-pointer" onClick={handleResendOTP}>
                    <span className="text-blue-500">Gửi lại OTP</span>
                   </div>
                  :
                    <div className="cursor-pointer">
                      <span className="text-gray-300">Gửi lại sau {blockTime}s</span>
                    </div>
                }
              </>
            }
            /> 
            </Form.Item>

            <div className="text-red-500 mb-5 text-center">The OTP has been sent</div>

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
                >Continue
              </Button>
              </div>
          </Form>
        </div>
      </div>
    </div>
    </UsersLayout>
  )
} 