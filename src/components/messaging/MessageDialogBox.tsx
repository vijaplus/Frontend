import Image from "next/image";

import img_avatarUser from '@/assets/images/avatar_fake_user.gif'

export function MessageDialogBox(){
  return(
    <div className="w-full cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={img_avatarUser}
            alt=""
            width={50}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <div className="font-semibold">Nguyen Duc Huy</div>
            <p>Hello</p>
          </div>
        </div>

        <div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            className="bi bi-three-dots cursor-pointer" 
            viewBox="0 0 16 16"
          > 
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
        </div>
      </div>
    </div>
  )
}