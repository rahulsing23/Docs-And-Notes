import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import CoverOptions from '@/utils/CoverOptions';

import { Button } from '@/components/ui/button';

function CoverPicker({ children, setNewCover }) {
    const [selectedCover, setSelectedCover] = useState();
  
  return (
    <Dialog>
      <DialogTrigger className="w-full ">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Cover</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
              {CoverOptions.map((cover, index) => (
                <div onClick={()=>setSelectedCover(cover?.imageUrl)}
                 className={`${selectedCover == cover?.imageUrl 
                    && 'border-primary border-2'} p-1 rounded-md`}
                  key={index}
                >
                  <img
                    src={cover?.imageUrl}
                    alt="Cover Image"
                    width={200}
                    height={140}
                    className="h-[70px] w-full rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={()=>setNewCover(selectedCover)}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CoverPicker;
