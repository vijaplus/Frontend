//import library
import Link from "next/link"
import { Fragment } from "react"
import { useRouter } from 'next/router'

type Props = {
    item: string,
    url: string
}
export function HorizontalNav({ items }: { items: Props[] }){
  const asPath = useRouter().asPath
  
  return(
    <div className="horizontalNav flex gap-10 h-full">
      {items.map(item =>{
        return(
          <Fragment key={item.url}>
            <Link 
              href={item.url} 
              className={
                "flex flex-col justify-center border-b-[0.1875rem] hover:border-b-blue-500 h-full border-transparent hover:text-blue-500 " + 
                (asPath == item.url ? "border-b-blue-500 text-blue-500": "" )
              }
            >
              <span>{item.item}</span>
            </Link> 
          </Fragment>
        )
      })}
    </div>
  )
}