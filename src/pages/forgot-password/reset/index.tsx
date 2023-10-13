import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth(["", "header", "messageValid", "messageBackend"])

//import library
import { useTranslation } from 'next-i18next';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

//import function component
import { Notification } from '@/components/notification';
import { UsersLayout } from '@/layouts/users/UsersLayout';
import { ROUTES } from '@/common/routes';
import { Button, Form, Input } from 'antd';
import { ResetForgotPasswordRequest } from '@/@types/request';
import AuthApiAdapter from '@/api/auth'
import { ResponseType } from '@/@types/response';

//code main
export default function ResetPassword(){
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
  const [isLoading, setIsLoading] = useState(false)

  if(statusPage === "pending") return

  const onFinishReset = (value:ResetForgotPasswordRequest) => {
    setIsLoading(true)
    AuthApiAdapter.post<ResetForgotPasswordRequest, ResponseType>("reset-password-new",{
      user_id: userData.user.id,
      token: userData.token,
      password_new: value.password_new
    }).then(res => {
      if(!res.status) return openNotificationWithIcon("error", t("messageBackend:fail"), t(res.errors) );
      router.push(ROUTES.LOGIN)
    }).finally(() =>{
      setIsLoading(false)
    })
  }

  return(
    <UsersLayout content= {t} userDataInfo={null}>
    {contextHolder}
    <div className="main flex-1">
      <div className="general-wrapper flex flex-col justify-center items-center min-h-screen">
        <div className="bg-[#f5f5f5] p-5 rounded -translate-y-1/4">
          <div className="font-semibold text-3xl mb-6 flex items-center justify-between">
            <span>Nhập mật khẩu mới</span>
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
          <Form
            layout="vertical"
            onFinish={onFinishReset}
          >
          <Form.Item<ResetForgotPasswordRequest>
            label={t("messageValid:password_new")}
            name="password_new"
            rules={[
              {
                required:true,
                message:t("messageValid:password_cannot_be_empty")
              }
            ]}
          >
           <Input.Password
              placeholder={t("messageValid:placeholder_password")}
              style={{
                minWidth:"432px", 
                width:"100%"
              }}
              size="large"
            /> 
            </Form.Item>

            <Form.Item
              label={t("messageValid:re_enter_password")}
              name="retype"
              rules={[
                {
                  required:true,
                  message:t("messageValid:password_cannot_be_empty")
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password_new') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t("messageValid:password_not_match")));
                  },
                }),
              ]}
            >
             <Input.Password
              placeholder={t("messageValid:placeholder_password")}
              style={{
                minWidth:"432px", 
                width:"100%"
              }}
              size="large"
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
                  cursor:!!isLoading  ? "not-allowed" : "pointer",
                  background: "#3b82f6",
                  opacity: !!isLoading  ? "0.5" : "1",
                  color:"white",
                }}
                 size='large'
                 disabled={!!isLoading  ? true : false}
                >Change
              </Button>
              </div>
          </Form>
        </div>
      </div>
    </div>
    </UsersLayout>
  )
}