import { ModalProps } from "@/interfaces/shared";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const Modal = ({
  triggerTitle,
  dialogTitle,
  description,
  subDescription,
  alternativDescription,
  dialogFooter,
  children,
}: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerTitle}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <DialogDescription>{subDescription}</DialogDescription>
          <DialogDescription>{alternativDescription}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>{dialogFooter}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
