//import function component
import UserHeader from "@/components/headers/UserHeader";

interface props {
  children: React.ReactNode;
  content:any,
  userDataInfo:any
} 

export function UsersLayout( props:props ){
  const {children, content, userDataInfo} = props
  return( 
    <main>
      <UserHeader content={content} userDataInfo= {userDataInfo} />
      {children}
      <p>Footer</p>
    </main>
  )
}
