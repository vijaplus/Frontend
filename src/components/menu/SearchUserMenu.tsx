import { useState } from "react"

const MenuItemAction = ({ id, text, setConvert }: { id: number, text: string, setConvert: (arg: number) => void }) =>{
  const handleConverted = (id:number) => setConvert(id)
  return(
    <div 
      className="flex items-center gap-3 px-5 py-3 cursor-pointer bg-[#356DF3]"
      onClick={()=>{handleConverted(id)}}
    >
      <div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          fill="#fff" 
          className="bi bi-ui-checks" 
          viewBox="0 0 16 16"
        > 
          <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </div>
      <span className="text-white">{text}</span>
    </div>
  )
}

const MenuItemInaction = ({ id, text, setConvert }: { id: number, text: string, setConvert: (arg: number) => void }) => {
  const handleConverted = (id:number) => setConvert(id)
  return(
    <div 
      className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-[#E7EBF3]"
      onClick={()=>{handleConverted(id)}}
    >
      <div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          fill="#5e6e7f" 
          className="bi bi-ui-checks" 
          viewBox="0 0 16 16"
        > 
          <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708l-2 2zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708l-2 2zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </div>
      <span className="text-[#5e6e7f]">{text}</span>
    </div>
  )
}

export function SearchUserMenu(){
  const [convert, setConvert] = useState<number>(1)
  return(
    <div className="w-full bg-[#f5f5f5] rounded-2xl py-5">
      <div className="px-5 pb-5 border-b-2">
        <span className="font-semibold text-lg">Filter</span>
      </div>

      <div className="flex flex-col py-5 border-b-2">
        {convert == 1 
        ?  <MenuItemAction id={1} text="All" setConvert={setConvert} />
        :  <MenuItemInaction id={1} text="All" setConvert={setConvert} />
        }
        {convert == 2
        ?  <MenuItemAction id={2} text="Posts" setConvert={setConvert} />
        :  <MenuItemInaction id={2} text="Posts" setConvert={setConvert} />
        }
        {convert == 3
        ?  <MenuItemAction id={3} text="Startups" setConvert={setConvert} />
        :  <MenuItemInaction id={3} text="Startups" setConvert={setConvert} />
        }
        {convert == 4
        ?  <MenuItemAction id={4} text="Investors" setConvert={setConvert} />
        :  <MenuItemInaction id={4} text="Investors" setConvert={setConvert} />
        }
      </div>
    </div>
  )
}