import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import StartupApiAdapter from '@/api/startups';
import { setCookies } from './withCookies';
import { ResponseType } from '@/@types/response';


export const withAuth = (namespaces: string[]) => {
  return async (context: GetServerSidePropsContext) => {
    const token = context.req.cookies.accessToken 
    const role = context.req.cookies.userRole
    let globalUserInfo:ResponseType | null = null
    if(token){
      if(role == "STARTUPS") {
        setCookies(token)
        await StartupApiAdapter.post("user-info").then(res => {
          if(!res.status) return
          globalUserInfo = res.data
        })
      }
    }
    return {
     props:{
      globalUserInfo: globalUserInfo,
       ...await serverSideTranslations(context.locale ?? 'en', namespaces),
     }
   }
}
}