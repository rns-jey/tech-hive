import { Button } from "@/components/atoms/button";
import { Separator } from "@/components/atoms/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/organisms/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import React from "react";

export default function LoginToContinue() {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "authenticate";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login to continue</DialogTitle>
        </DialogHeader>
        <Separator />
        <DialogDescription>
          We are a community where developers connect, stay informed, and advance their careers.
        </DialogDescription>
        <DialogFooter>
          <SignInButton>
            <Button onClick={onClose}>Login</Button>
          </SignInButton>
          <SignUpButton>
            <Button onClick={onClose}>Create account</Button>
          </SignUpButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
