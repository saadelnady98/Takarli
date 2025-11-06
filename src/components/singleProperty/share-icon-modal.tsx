"use client";
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export default function ShareModal({ isOpen, onClose, url }: ShareModalProps) {
  const [copied, setCopied] = React.useState(false);
  const t=useTranslations("singleProperty")
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy URL:");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-xl max-w-[calc(100vw-2rem)]  p-4 mx-auto  bg-white text-dark border border-gray-200 shadow-xl animate-in fade-in zoom-in-95"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Share2 className="w-5 h-5 text-primary" />
            {t("share")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 mt-3">
          <Input
            readOnly
            value={url}
            className="flex-1 text-sm text-gray-700 bg-gray-50 cursor-default"
          />
          <Button
            onClick={handleCopy}
            size="icon"
            variant="secondary"
            className="transition-all cursor-pointer  "
          >
            {copied ? (
              <Check className="h-4 w-4 text-dark" />
            ) : (
              <Copy className="h-4 w-4 cursor-pointer " />
            )}
          </Button>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} className="cursor-pointer">
            {t("close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
