import { getCookies } from '@/utils/withCookies';
import axios from 'axios';

const StartupApiAdapter = axios.create({
  baseURL: `${process.env.API_AUTH}`
})

StartupApiAdapter.interceptors.response.use(function (res) {
  return res.data;
}, function(error){
   return Promise.reject(error);
}
);

StartupApiAdapter.interceptors.request.use((req) => { 
  const token = getCookies()
  req.headers.Authorization = `Bearer ${token}`
  return req
})

export default StartupApiAdapter