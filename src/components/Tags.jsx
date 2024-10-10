import { Reorder } from "framer-motion"
import { useState } from "react"
import { ScrollArea } from '@/components/ui/scroll-area';
export default function Tags() {
  const [items, setItems] = useState([0, 1, 2, 3])
  
  return (
    <ScrollArea className=" h-screen w-full rounded-md  p-4">
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      {items.map((item, index) => (
        <Reorder.Item key={index} value={item} className=" mt-5 bg-blue-900 w-[320px] p-2 text-white text-center boder-none rounded-md" >
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
    </ScrollArea>
  )
}