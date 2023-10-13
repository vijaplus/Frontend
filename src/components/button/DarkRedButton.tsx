import Link from "next/link";

type props = {
  item: string,
  url: string
}

export function DarkRedButton({items}:{items:props}){
  return(
    <Link href={items.url} className="bg-[#DD561D] rounded px-5 py-3 cursor-pointer">
       <span className="font-semibold text-white">{items.item}</span>
    </Link>
  )
}