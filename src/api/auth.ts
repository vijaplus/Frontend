import axios from 'axios';

const AuthApiAdapter = axios.create({
  baseURL: `${process.env.API_AUTH}`
})

AuthApiAdapter.interceptors.response.use(function (response) {
  return response.data;
}, function(error){
   return Promise.reject(error);
}
);

export default AuthApiAdapter
