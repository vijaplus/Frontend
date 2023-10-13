import Link from "next/link";

type props = {
  item: string,
  url: string
}

export function WhiteButton({items}:{items:props}){
  return(
    <Link href={items.url} className="bg-white rounded px-5 py-3 cursor-pointer">
       <span className="font-semibold text-black">{items.item}</span>
    </Link>
  )
}