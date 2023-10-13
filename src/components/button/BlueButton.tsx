
import Link from "next/link";

type props = {
  item: string,
  url: string
}

export function BlueButton({items}:{items:props}){
  return(
    <Link href={items.url} className="bg-blue-500 rounded px-5 py-3 cursor-pointer w-full text-center">
       <span className="font-semibold text-white">{items.item}</span>
    </Link>
  )
}