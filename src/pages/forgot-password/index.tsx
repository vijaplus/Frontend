import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth(["", "header", "messageValid", "messageBackend"])

//import library
import { useTranslation } from "next-i18next";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

//import function component
import { UsersLayout } from "@/layouts/users/UsersLayout";
import { Notification } from "@/components/notification";
import AuthApiAdapter from "@/api/auth";
import { ResponseType } from "@/@types/response";
import { setUserInfo } from "@/redux/features/user/userSlice";
import { ROUTES } from "@/common/routes";
import { ForgotPasswordRequest } from "@/@types/request";

//code main
export default function ForgotPasswordPage(){
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { contextHolder, openNotificationWithIcon} = Notification()

  const [isLoading, setIsLoading] = useState(false)
  const [blockTime, setBlockTime] = useState(0)
  const [allowThreeTime , setAllowThreeTime] = useState(0)

  const onFinishForgotPassword = (value:ForgotPasswordRequest) => {
    setBlockTime(0)
    setAllowThreeTime((preTime) => preTime + 1)
    if(allowThreeTime >= 4){
      setAllowThreeTime(0)
      setBlockTime(15)
    }  
    setIsLoading(true)
    AuthApiAdapter.post<ForgotPasswordRequest,ResponseType>("send-otp-forgot-password", value)
      .then(res => {
        if(!res.status) return openNotificationWithIcon("error", t("messageBackend:fail"), t(res.errors) );
        dispatch(setUserInfo(res.data.user))
        router.push(ROUTES['FORGOT_PASSWORD/AUTH'])
      }).finally(() => {
        setIsLoading(false)
      })
  }

  if(blockTime >0 && blockTime <= 15) {
    setTimeout(() => {
     setBlockTime(blockTime - 1)
   }, 1000)
  }
 
  return(
    <UsersLayout content= {t} userDataInfo={null} >
      {contextHolder}
      <div className="main flex-1">
        <div className="general-wrapper flex flex-col justify-center items-center min-h-screen">
          <div className="bg-[#f5f5f5] p-5 rounded-2xl -translate-y-2/4">
            <div className="font-semibold text-3xl mb-5">Đặt lại mật khẩu</div>
            <Form
              layout="vertical"
              onFinish={onFinishForgotPassword}
            >
              <Form.Item<ForgotPasswordRequest>
                label={t("messageValid:email")}
                name="email"
                rules={[
                  { 
                    required: true, 
                    message: t("messageValid:email_cannot_be_empty")
                  },
                  {
                    type: 'email', 
                    message: t("messageValid:invalid_email_format")
                  }
                ]}
              >
                  <Input 
                    placeholder={t("messageValid:placeholder_email")} 
                    size="large"
                    style={{width:"432px"}}
                    suffix={
                      <>
                      {!!blockTime &&
                        <div className="cursor-pointer">
                          <span className="text-gray-300">{t("authEmail:sendAgainLater")} {blockTime}s</span>
                        </div>
                      }
                      </>
                    }
                  />
                </Form.Item>

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