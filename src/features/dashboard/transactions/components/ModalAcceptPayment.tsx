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
  import { FC } from "react";
  
  interface ModalAcceptPaymentProps {
    onClick: () => void;
    isPending: boolean;
    children: React.ReactNode;
  }
  
  export const ModalAcceptPayment: FC<ModalAcceptPaymentProps> = ({
    isPending,
    onClick,
    children
  }) => {
    return (
      <AlertDialog>
        {/* Gunakan className untuk custom style */}
        <AlertDialogTrigger
          disabled={isPending}
          className="bg-green-500 text-white hover:bg-green-600 rounded-md text-sm py-2 px-3 hover:cursor-pointer"
        >
          Accept Payment
        </AlertDialogTrigger>
  
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark the payment as accepted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onClick} className="bg-green-500 text-sm text-white hover:bg-green-600 rounded-md hover:cursor-pointer">
              Accept Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default ModalAcceptPayment;