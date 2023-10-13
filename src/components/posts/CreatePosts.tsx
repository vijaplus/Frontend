
//import library
import Image from 'next/image'

//import function component
import { checkAvatar } from '@/utils/checkAvatar'
import CreatePostsModal from '../modals/CreatePostsModal'


interface props {
  content: any,
  userDataInfo: any
}

export function CreatePosts(props:props){
  const {content, userDataInfo} = props
  return(   
    <div className="bg-[#f5f5f5] p-5 rounded-2xl w-full">
      <div className="flex gap-5 items-center">
        <Image
          src={checkAvatar(userDataInfo.avatar)}
          alt="avatar"
          width={50}
          priority
          className="rounded-full"
        />
        <div 
          className="rounded-full bg-white px-5 py-3 mr-5 w-full cursor-pointer"
          
        >
          <span>{content("home:createPosts.createPosts")}</span>
          <CreatePostsModal content={content} userDataInfo={userDataInfo} />
        </div>
       </div>
     </div>
  )
}