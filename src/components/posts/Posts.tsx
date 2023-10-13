import img_avatarUser from '@/assets/images/avatar_fake_user.gif'
import Image from 'next/image'
import { FollowButton } from '../button/FollowButton'
import img_postsFake from '@/assets/images/posts_fake.png'

export function Posts(){
  return(
    <div className="posts w-full bg-[#f5f5f5] rounded-2xl">
      <div className="flex flex-col gap-5 py-5">
        <div className="px-5 flex gap-3">
          <div>
            <Image
              src={img_avatarUser}
              alt="avatar"
              width={50}
              priority
              style={{objectFit:"contain"}}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-5 ml-3 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-semibold">Nguyen Duc Huy</span>
                <pre className="text-xs"> · 2 minutes ago</pre>
              </div>
              <div className="flex gap-5 items-center">
                <FollowButton items={{item:"+ Follow"}} />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" height="24" 
                  fill="currentColor" 
                  className="bi bi-three-dots cursor-pointer" 
                  viewBox="0 0 16 16"
                > 
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/> 
                </svg>
              </div>
            </div>

            <div className="posts-main flex flex-col gap-5">
              <p>It’s encouraging to see that the government has reaffirmed its commitment to ending the sale of new petrol and diesel cars and vans in the UK from 2030. It’s encouraging to see that the government has reaffirmed</p>
              <div className="w-full bg-black flex flex-col justify-center">
                <Image 
                  src={img_postsFake}
                  alt="threeDots"
                  className="mx-auto"
                  priority
                  style={{objectFit:"contain"}}
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5 py-3 border-t-2 border-b-2 border-[#e2e8f0] flex items-center justify-between px-5">
          <div className="flex gap-2 items-center">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                fill="currentColor" 
                className="bi bi-heart cursor-pointer"
                viewBox="0 0 16 16"
            > 
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            <p>44</p>
          </div>
          <div className="flex gap-2 items-center">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                fill="currentColor" 
                className="bi bi-chat cursor-pointer" 
                viewBox="0 0 16 16"
            > 
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/> 
            </svg>
            <p>44</p>
          </div>
          <div className="">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="24" 
                height="24" 
                fill="currentColor" 
                className="bi bi-share cursor-pointer" 
                viewBox="0 0 16 16"
            > 
                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/> 
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}