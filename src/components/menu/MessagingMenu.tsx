import { Input, Select } from "antd";
import { MessageDialogBox } from "../messaging/MessageDialogBox";


export function MessagingMenu(){
  return(
    <div className="w-full bg-[#f5f5f5] rounded-2xl py-5 h-full overflow-hidden">
      <div className="flex flex-col gap-5 h-full">
        <div className="relative pb-5 border-b-2 px-5 ">
          <Input 
            placeholder="Search by name or email" 
            className="py-3"
            suffix={
              <div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  width="16" 
                  height="16" 
                  fill="currentColor" 
                  className="bi bi-search" 
                  viewBox="0 0 16 16"
                > 
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div>
            }
          />
        </div>

        <div className="flex items-center gap-2 pb-5 border-b-2 px-5 ">
          <Select
            className="w-full"
            size="large"
            defaultValue="All"
            options={[
              { value: 'All', label: 'All' },
              { value: 'Unread', label: 'Unread' },
              { value: 'Seen', label: 'Seen' }
            ]}
          />
        </div>

        <div className="overflow-y-auto relative flex-1 pl-5 overflow-hidden">
          <div className="absolute h-full w-full">
            <div className="flex flex-col gap-5 pr-5 mr-5">
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
              <MessageDialogBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}