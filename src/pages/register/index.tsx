import { withAuth } from "@/utils/withAuth";
export const getServerSideProps = withAuth(["register", "header", "messageValid", "messageBackend"])

//import library
import { useTranslation } from "next-i18next";
import { Button, Form, Input, Select } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

//import function component
import { Notification } from "@/components/notification";
import { UsersLayout } from "@/layouts/users/UsersLayout";
import AuthApiAdapter from "@/api/auth";
import { ResponseType } from "@/@types/response";
import { setUserInfo } from "@/redux/features/user/userSlice";
import { ROUTES } from "@/common/routes";
import { RegisterRequest } from "@/@types/request";

//code main
export default function RegisterPage(){
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const router = useRouter()
  const { contextHolder, openNotificationWithIcon} = Notification()

  const [isLoading, setIsLoading] = useState(false)
  const [companyType, setCompanyType] = useState([])
  const [businessType, setBusinessType] = useState([])
  const [blockRenderFirst, setBlockRenderFirst] = useState(true)
  
  useEffect(() =>{
    setBlockRenderFirst(false)
  },[])

  useEffect(()=>{
    if(blockRenderFirst) return
    const promise = ["company-type","business-type"]
    const results = promise.map(url => AuthApiAdapter.get(url).then(res =>  res.data))
    Promise.all(results).then( ([companyType,businessType]) => {
      setCompanyType(companyType)
      setBusinessType(businessType)
    })
    
  },[blockRenderFirst])
  
  const prefixSelectorPhone = (
    <Form.Item<RegisterRequest> name="phone_number_country" noStyle>
      <Select size="large">
        <Select.Option value="+84">+84</Select.Option>
        <Select.Option value="+81">+81</Select.Option>
      </Select>
    </Form.Item>
  );

  const onFinishRegister = (value:RegisterRequest) =>{
    setIsLoading(true)
    AuthApiAdapter.post<RegisterRequest, ResponseType>("register", value)
      .then(res => {
        if(!res.status) return openNotificationWithIcon("error", t("messageBackend:fail"), t(res.errors));
        dispatch(setUserInfo(res.data.user))
        router.push(ROUTES.AUTH_EMAIL)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  return(
    <UsersLayout content= {t} userDataInfo= {null}>
      {contextHolder}
      <div className="main">
        <div className="general-wrapper">
          <div className="max-w-5xl flex flex-col py-12 mx-auto gap-10">
            <p className="text-3xl font-bold text-center">{t("register:title")}</p>
            <Form
              layout="vertical"
              onFinish={onFinishRegister}
              initialValues={{phone_number_country: "+84"}}
            >
              <div className="flex items-center gap-5">
                <Form.Item<RegisterRequest>
                  label= {t("messageValid:email")}
                  name="email"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: t("messageValid:email_cannot_be_empty")
                    },
                    {
                      type: "email",
                      message: t("messageValid:invalid_email_format")
                    }
                  ]}
                >
                  <Input placeholder={t("messageValid:placeholder_email")} size="large" />
                </Form.Item>
                <Form.Item<RegisterRequest>
                  label= {t("messageValid:phone")}
                  name="phone_number_digit"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: t("messageValid:phone_cannot_be_empty")
                    },
                    {
                      pattern: /^[0-9]*$/,
                      message: t("messageValid:invalid_phone_format")
                    }
                  ]}
                >
                  <Input 
                    addonBefore={prefixSelectorPhone} 
                    size="large"
                    bordered
                    />
                </Form.Item>
              </div>

              <div className="flex items-center gap-5">
                <Form.Item<RegisterRequest>
                  label= {t("messageValid:password")}
                  name="password"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: t("messageValid:password_cannot_be_empty")
                    },
                    {
                      min: 6,
                      message: t("messageValid:min_6")
                    },
                    {
                      max: 30,
                      message: t("messageValid:max_30")
                    }
                  ]}
                >
                    <Input.Password placeholder={t("messageValid:placeholder_password")} size="large" />
                </Form.Item>
                <Form.Item
                  label= {t("messageValid:re_enter_password")}
                  name="retype"
                  className="w-full"
                  rules={[
                    {
                      required:true,
                      message:t("messageValid:password_cannot_be_empty")
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(t("messageValid:password_not_match")));
                      },
                    }),
                  ]}
                >
                    <Input.Password placeholder={t("messageValid:placeholder_password")} size="large"/>
                </Form.Item>
              </div>

              <div className="flex items-center gap-5">
                <Form.Item<RegisterRequest>
                  label= {t("messageValid:name")}
                  name="name"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: t("messageValid:name_cannot_be_empty")
                    },
                    {
                      min: 6,
                      message: t("messageValid:min_6")
                    },
                    {
                      max: 30,
                      message: t("messageValid:max_30")
                    }
                  ]}
                >
                    <Input placeholder={t("messageValid:placeholder_name")} size="large" />
                </Form.Item>
                <Form.Item<RegisterRequest>
                  label={t("messageValid:company_name")}
                  name="company_name"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: t("messageValid:company_name_cannot_be_empty")
                    },
                  ]}
                >
                  <Input placeholder={t("messageValid:placeholder_company_name")} size="large" />
                </Form.Item>
              </div>

              <div className="flex items-center gap-5">
                <Form.Item<RegisterRequest>
                  label={t("messageValid:company_type")}
                  name="company_type"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: t("messageValid:company_type_cannot_be_empty")
                    },
                  ]}
                >
                  <Select
                    placeholder={t("messageValid:placeholder_company_type")}
                    size="large"
                    style={{textTransform:"capitalize"}}
                  >
                   {companyType?.map( (item:any) => {
                      return(
                        <Fragment key={item.id}>
                          <Select.Option 
                            value={item.id}
                            style={{textTransform:"capitalize"}}
                          > 
                            {item.item}
                          </Select.Option>
                        </Fragment>
                    )})}
                  </Select> 
                </Form.Item>

                <Form.Item<RegisterRequest>
                  label={t("messageValid:business_type")}
                  name="business_type_id"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: t("messageValid:business_type_cannot_be_empty")
                    },
                  ]}
                >
                  <Select
                    placeholder={t("messageValid:placeholder_business_type")}
                    size="large"
                    style={{textTransform:"capitalize"}}
                  >
                   {businessType?.map( (item:any) => {
                      return(
                        <Fragment key={item.id}>
                          <Select.Option 
                            value={item.id}
                            style={{textTransform:"capitalize"}}
                          > 
                            {item.name}
                          </Select.Option>
                        </Fragment>
                    )})}
                  </Select> 
                </Form.Item>
              </div>
              
              <Button 
                htmlType="submit"
                style={{
                  padding:"25px",
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
              >{t("register:btnRegister")}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </UsersLayout>
  )
}