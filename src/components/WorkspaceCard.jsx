import React from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
const WorkspaceCard = ({ coverImage, workspaceName, tags }) => {
  return (
    <div className=" shadow-red-950 rounded-3xl w-[300px] border-blue-950 border-[1px]">
      <div className="relative group cursor-pointer">
        <div className="group-hover:opacity-40 cursor-pointer ">
          <img
            src={coverImage}
            alt="Cover Image"
            width={400}
            height={400}
            className="w-full h-[200px] object-cover  rounded-3xl"
          />
        </div>
      </div>

      <div className="flex justify-between items-center  capitalize ">
        <div className="p-5 shadow-2xl hover:text-orange-600">
          <h2 className="font-medium text-2xl">{workspaceName}</h2>
          <h2 className="mt-2 text-sm">{tags}</h2>
        </div>

        <div className="mt-8 flex items-center gap-2 pr-4">
          <DropdownMenu className="">
            <DropdownMenuTrigger >
                <SlOptionsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-transparent bg-opacity-50 border-black bg-black text-white">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="bottom">
                <DropdownMenuRadioItem className="focus:text-green-600">Open</DropdownMenuRadioItem>
                <DropdownMenuRadioItem>Hide</DropdownMenuRadioItem>
                <DropdownMenuRadioItem>Secure</DropdownMenuRadioItem>
                <DropdownMenuRadioItem className="focus:text-red-600">Delete</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
