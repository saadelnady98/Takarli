"use client"
import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import AgentCard from "./AgentCard"
import { SinglePropertyResponse } from "@/app/[locale]/[propertySlug]/[slug]/page"

interface Props {
  isOpen: boolean
  onClose: () => void
  propertyId: string
  singlePropertyData: SinglePropertyResponse
}

export default function MobileAgentCard({
  isOpen,
  onClose,
  propertyId,
  singlePropertyData,
}: Props) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onClose()
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-badge w-[90%] rounded-2xl px-4 pt-3 pb-10 shadow-xl"
          >
            <div className="mb-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-dark hover:bg-dark/80 cursor-pointer p-2 text-white transition-colors rounded-full"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
            <AgentCard singlePropertyData={singlePropertyData} propertyId={propertyId} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
