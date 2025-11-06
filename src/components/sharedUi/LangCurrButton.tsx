"use client"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react"
import ModalBodyy from "./SharedModalBody"
import { languages, currency } from "@/data/data"
import LangCurrSwitcher from "../LangCurrSwitcher"
import React from "react"
import { useLangCurr } from "@/context/langCurrContext"
import { Button } from "../ui/button"
import { NavbarResponse } from "@/types/navbar-types"
import { useTranslations } from "next-intl"

export default function LangCurrButton({ data }: { data: NavbarResponse["data"] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { language, currency: curr, setLanguage, setCurrency } = useLangCurr()
  const [selectedLanguage, setSelectedLanguage] = React.useState(language)
  const [selectedCurrency, setSelectedCurrency] = React.useState(curr)
  const t = useTranslations("Navbar")
  
  
  React.useEffect(() => {
    if (isOpen) {
      setSelectedLanguage(language)
      setSelectedCurrency(curr)
    }
  }, [isOpen, language, curr])

  return (
    <div>
      <LangCurrSwitcher onClick={onOpen} data={data} />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="z-[9999]"
        scrollBehavior="inside"
        placement="center" // إضافة placement center
        // size="lg"
      >
        <ModalContent className="text-dark max-w-[90%] mx-auto items-center gap-[1rem] rounded-none bg-white p-[1.25rem] sm:max-w-[80%] md:max-w-[28rem]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 !px-0 !py-0 w-full">
                <h3 className="text-dark font-[galleds] text-xl lg:text-2xl text-center w-full">
                  {t("selectLang")}
                </h3>
              </ModalHeader>

              <ModalBody className="text-dark overflow-y-none flex w-full flex-col gap-4 !px-0 !py-0">
                <ModalBodyy
                  title={t("language")}
                  data={languages}
                  value={selectedLanguage}
                  onChange={(v) => setSelectedLanguage(v)}
                />
                <ModalBodyy
                  title={t("currency")}
                  data={currency}
                  value={selectedCurrency}
                  onChange={(v) => setSelectedCurrency(v)}
                />
              </ModalBody>

              {/* ===== Footer ===== */}
              <ModalFooter className="flex w-full justify-end !px-0 !py-0">
                <Button
                  className="bg-dark flex h-[2.5rem] w-[6.125rem] cursor-pointer items-center justify-center rounded-none text-white transition hover:opacity-90"
                  onClick={() => {
                    setLanguage(selectedLanguage)
                    setCurrency(selectedCurrency)
                    onClose()
                  }}
                >
                  {t("apply")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}