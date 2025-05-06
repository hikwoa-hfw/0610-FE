import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { FC } from "react";

interface ModalDeleteEventProps {
  onClick: () => void;
  isPending: boolean;
}

const ModalDeleteEvent: FC<ModalDeleteEventProps> = ({
  isPending,
  onClick,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isPending} asChild>
        <Button variant="destructive" className="py-4 hover:bg-red-500 hover:cursor-pointer">
          Delete Event
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:cursor-pointer" onClick={onClick}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalDeleteEvent;
