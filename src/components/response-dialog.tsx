import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ResponseDialogProps {
    open: boolean;
    onClose: () => void;
    success: boolean;
    message: string;
}

const ResponseDialog = ({ open, onClose, success, message } : ResponseDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{success ? "Sucesso" : "Erro"}</DialogTitle>
                </DialogHeader>
                <DialogDescription>{message}</DialogDescription>
                {open && 
                <Button type="button"
                        className="font-regular rounded-xl bg-green-500 py-5 font-poppins text-green-950 ring-0 transition-colors hover:bg-green-600"
                        onClick={onClose}
                        >OK</Button>}
            </DialogContent>
        </Dialog>
    );
};

export default ResponseDialog;
