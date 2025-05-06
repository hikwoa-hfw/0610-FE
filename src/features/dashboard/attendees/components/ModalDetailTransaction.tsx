import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import type { FC } from "react";
import Image from "next/image";
import { Banknote, Mail, User, Tag, Gift, Coins } from "lucide-react";
import useGetTransactionDetail from "@/hooks/api/transactions/useGetTransactionDetail";
import Link from "next/link";

interface ModalDetailTransactionProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    uuid: string;
    status?: string;
    totalPrice?: number;
    pointAmount?: number;
    voucherAmount?: number;
    couponAmount?: number;
    paymentProof?: string | null;
    vouchers?: {
      code?: string;
    };
    users?: {
      fullName?: string;
      email?: string;
    };
    transaction_details?: Array<{
      name?: string;
      qty?: number;
      price?: number;
    }>;
    createdAt?: string;
  };
}

const ModalDetailTransaction: FC<ModalDetailTransactionProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const { data: tx, isPending } = useGetTransactionDetail(transaction.uuid);
  console.log(transaction.uuid);

  console.log(tx);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isPending || !tx) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Loading...</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">Memuat detail transaksi</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction ID and Status */}
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Transaction ID
              </span>
              <span className="font-mono text-sm">{tx.uuid}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Status</span>
              <Badge
                variant="outline"
                className={
                  tx.status === "PAID" ? "bg-green-500 text-white" : ""
                }
              >
                {tx.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Date</span>
              <span className="text-sm">{formatDate(tx.createdAt)}</span>
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Customer Information</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">
                <User className="text-muted-foreground h-4 w-4" />
                <span className="text-sm">{tx.users?.fullName ?? "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="text-muted-foreground h-4 w-4" />
                <span className="text-sm">{tx.users?.email ?? "-"}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Payment Breakdown</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm">Point Amount</span>
                </div>
                <span className="text-sm">
                  {formatter.format(Number(tx.pointAmount ?? 0))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm">Voucher Amount</span>
                </div>
                <span className="text-sm">
                  {formatter.format(Number(tx.voucherAmount ?? 0))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm">Coupon Amount</span>
                </div>
                <span className="text-sm">
                  {formatter.format(Number(tx.couponAmount ?? 0))}
                </span>
              </div>
              {tx.vouchers && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">Voucher Code</span>
                  </div>
                  <Badge variant="outline">{tx.vouchers.code}</Badge>
                </div>
              )}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Banknote className="text-muted-foreground h-4 w-4" />
                  <span className="font-medium">Total Price</span>
                </div>
                <span className="font-medium">
                  {formatter.format(Number(tx.totalPrice ?? 0))}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Proof */}
          {tx.paymentProof && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Payment Proof</h3>
                <div className="relative h-48 w-full overflow-hidden rounded-md border">
                  <Link href={tx.paymentProof} target="_blank">
                    <Image
                      src={tx.paymentProof}
                      alt="Payment Proof"
                      fill
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Ticket Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Ticket Details</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket Name</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tx.transaction_details && tx.transaction_details.length > 0 ? (
                  tx.transaction_details.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium capitalize">
                        {detail.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {detail.qty}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatter.format(detail.price)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="py-2 text-center">
                      No ticket details found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetailTransaction;
