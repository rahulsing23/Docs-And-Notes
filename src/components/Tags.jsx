
import { useState } from "react"
import { ScrollArea } from '@/components/ui/scroll-area';
export default function Tags({workspace}) {
  
  
  return (
   
    <div>
        <div className=" mt-5 bg-blue-900 w-[320px] p-2 text-white text-center boder-none rounded-md" >
          {workspace.workspaceName}
        </div>
      
    </div>
 
  )
}