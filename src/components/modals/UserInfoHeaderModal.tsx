import { setUserInfo } from "@/redux/features/user/userSlice"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

export const UserInfoHeaderModal = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogout = () => {
    dispatch(setUserInfo(null))
    document.cookie = "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    document.cookie = "userRole=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    router.push("/")
  }

  return(
    <div className="UserInfoHeaderModal absolute left-0 right-0 top-full bg-white shadow-xl z-30 border rounded min-w-[10rem]">
      <div className="flex flex-col min-w-full">
        <div 
          className="w-full flex item-center cursor-pointer p-5 hover:bg-[#f5f5f5] gap-2"
          // onClick={() => changeLanguage('en')}
        >
          <span>Trang cá nhân</span>
          <div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className="bi bi-person" 
              viewBox="0 0 16 16"> 
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
          </div>
        </div>
        <div 
          className="w-full flex item-center cursor-pointer p-5 hover:bg-[#f5f5f5] gap-2"
          onClick={handleLogout}
        >
          <span>Đăng xuất</span>
          <div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className="bi bi-power" 
              viewBox="0 0 16 16"> 
              <path d="M7.5 1v7h1V1h-1z"/>
              <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}