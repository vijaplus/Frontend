
type Item = {
    item: string,
  }

export function FollowButton({items}:{items:Item}){
  return(
    <div className="bg-[#FFB11A] rounded px-5 py-3 cursor-pointer text-center">
       <span className="font-semibold text-white">{items.item}</span>
    </div>
  )
}