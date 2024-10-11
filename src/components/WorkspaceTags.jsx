import React, {useState} from "react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 

const  DropdownMenuCheckboxes = ({TagSelected}) => {
 
    const [tagSelected, setTagSelected] = useState("@tags");
    const tags = ["Daily-Routine",  "Personal", "Learning", "Festival", "Ocassion",  "Sports","Education", "Project"]
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{tagSelected}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Add Tag</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value="bottom" >
            {tags.map((tag, index) =>(
                <DropdownMenuRadioItem value="top"  key={index} 
                onClick={()=>{
                    setTagSelected(tag)
                    TagSelected(tag)

                }}>{tag}</DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
export default  DropdownMenuCheckboxes
