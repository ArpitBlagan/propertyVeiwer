import {
  Dialog as DD,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Contactform from "./Contactform";
import { useState } from "react";
const Dialog = ({ id }: any) => {
  const [open, setO] = useState(false);
  return (
    <DD open={open} onOpenChange={setO}>
      <DialogTrigger>Contact Owner</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send direct message to the owner.</DialogTitle>
          <DialogDescription>
            <Contactform setD={setO} property={id} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </DD>
  );
};

export default Dialog;
