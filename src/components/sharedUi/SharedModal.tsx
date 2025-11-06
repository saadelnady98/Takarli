"use client";
import { SharedModalProps } from "@/types/interfaceData";
import { Modal, ModalContent, useDisclosure } from "@heroui/react";
import React from "react";

export default function SharedModal({ children }: SharedModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const safeChildren = React.Children.toArray(children);

  return (
    <>
      <div
        onClick={onOpen}
        className="cursor-pointer absolute inset-0 flex items-center justify-center"
      >
        {safeChildren[0]}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        classNames={{
          backdrop: "bg-black/90 backdrop-blur-md",
        }}
      >
        <ModalContent className="max-w-6xl w-full bg-transparent rounded-none text-white shadow-none">
          {safeChildren[1]}
        </ModalContent>
      </Modal>
    </>
  );
}
