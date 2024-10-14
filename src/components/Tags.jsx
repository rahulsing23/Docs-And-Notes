
import { useState } from "react"
import { ScrollArea } from '@/components/ui/scroll-area';
export default function Tags() {
  const [items, setItems] = useState([0, 1, 2, 3])
  
  return (
    <ScrollArea className=" h-screen w-full rounded-md  p-4">
    {/* <div>
        <div key={index} value={item} className=" mt-5 bg-blue-900 w-[320px] p-2 text-white text-center boder-none rounded-md" >
          {item}
        </div>
      ))}
    </div> */}
    </ScrollArea>
  )
}