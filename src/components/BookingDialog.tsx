import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useCopy } from "../lib/copy";
export default function BookingDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  wide = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const c = useCopy();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="ad-booking-dialog-overlay" />
        <Dialog.Content
          onEscapeKeyDown={(event) => {
            if (document.querySelector(".ad-modal-backdrop")) event.preventDefault();
          }}
          className={"ad-site ad-booking-dialog " + (wide ? "ad-booking-dialog-wide" : "")}
        >
          <div className="ad-booking-dialog-heading">
            <div>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>{description}</Dialog.Description>
            </div>
            <Dialog.Close className="ad-dialog-close" aria-label={c("Close", "Fermer")}>
              <X size={21} />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
