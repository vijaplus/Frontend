import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth(["login", "header", "messageValid", "messageBackend"]);

//import library
import Image from "next/image";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

//import function component
import AuthApiAdapter from "@/api/auth";
import { Notification } from "@/components/notification";
import { ResponseType } from "@/@types/response";
import { ROUTES } from "@/common/routes";
import { setUserInfo } from "@/redux/features/user/userSlice";
import { LoginRequest } from "@/@types/request";

//import image
import img_google from "@/assets/images/google.png";
import img_bannerLogin from "@/assets/images/banner-login.png";
import { UsersLayout } from "@/layouts/users/UsersLayout";

//code main
export default function LoginPage() {
  const { t } = useTranslation();
  const { contextHolder, openNotificationWithIcon} = Notification()
  const dispatch = useDispatch()
  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState(false)

  const onFinishLogin = (value: LoginRequest) => {
    setIsLoading(true)
    AuthApiAdapter.post<LoginRequest, ResponseType>("login", value).then( res =>{
      if(!res.status) return openNotificationWithIcon("error", t("messageBackend:fail"), t(res.errors) );
      dispatch(setUserInfo(res.data.user))
      if(!!res.data.user.is_verified){
        const expires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
        document.cookie = "accessToken=" +res.data.token+ ";expires=" + expires.toUTCString() + ";path=/"
        document.cookie = "userRole=" +res.data.user.company_type+ ";expires=" + expires.toUTCString() + ";path=/"
        router.push(ROUTES.HOME)
      }else{
        router.push(ROUTES.AUTH_EMAIL)
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return(
    <UsersLayout content= {t} userDataInfo={null}>
      {contextHolder}
      <div className="main flex-1">
        <div className="general-wrapper flex min-h-screen">
          <div className="flex-1">
            <Image
              src={img_bannerLogin}
              style={{height:"100%"}}
              alt=""
              priority
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col py-8 gap-5 px-10">
              <p className="text-3xl font-bold text-center my-5">{t("login:title")}</p>
              <Form
                layout="vertical"
                onFinish={onFinishLogin}
              >
                <Form.Item<LoginRequest>
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
                    size='large'
                  />
                </Form.Item>

                <Form.Item<LoginRequest>
                  label={t("messageValid:password")}
                  name="password"
                  rules={[
                    { 
                      required: true ,
                      message: t("messageValid:password_cannot_be_empty")
                    }
                  ]}
                >
                  <Input.Password 
                    placeholder={t("messageValid:placeholder_password")} 
                    size='large' 
                  />
                </Form.Item>
                
                <Link href={ROUTES.FORGOT_PASSWORD}>
                  <pre className="text-blue-500 font-semibold text-base mb-6">{t("login:forgotPassword")}</pre>
                </Link>

                <div className="flex w-full mb-6">
                  <Button 
                    htmlType="submit"
                    style={{
                      width:"100%",
                      padding:"25px 0",
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      cursor:isLoading ? "not-allowed" : "pointer",
                      background: "#3b82f6",
                      opacity: isLoading ? "0.5" : "1",
                      color:"white",
                    }}
                    size='large'
                    disabled={isLoading}
                  >{t("login:login")}
                  </Button>
                </div>

                <div className='border-t-[1px] relative my-8'>
                  <div className="absolute top-0 left-2/4 -translate-y-2/4 bg-white p-3 -translate-x-2/4">
                    <span>{t("login:or")}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex border-2 rounded-full justify-center items-center gap-5 cursor-pointer py-3">
                    <Image
                      src={img_google}
                      alt=""
                      width={36}
                      priority
                      style={{objectFit:"contain"}}
                    />
                    <span className="text-base">{t("login:continueGoogle")}</span>
                  </div>

                  <div className="flex items-center gap-1 justify-center">
                    <span>{t("login:notAccount")}</span>
                    <Link href={ROUTES.REGISTER} className="text-blue-500">{t("login:registerNow")}</Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </UsersLayout>
  )
}
