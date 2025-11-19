"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Button } from "../ui/button";
import LangCurrSwitcher from "../LangCurrSwitcher";
import ModalBodyy from "./SharedModalBody";
import { useLangCurr } from "@/context/langCurrContext";
import { languages, currency } from "@/data/data";
import { NavbarResponse } from "@/types/navbar-types";
import { useTranslations } from "next-intl";

interface LangCurrButtonProps {
  data: NavbarResponse["data"];
}

const LangCurrModalContent = React.memo(
  ({
    selectedLanguage,
    selectedCurrency,
    onLanguageChange,
    onCurrencyChange,
    onApply,
  }: {
    onClose: () => void;
    selectedLanguage: string;
    selectedCurrency: string;
    onLanguageChange: (v: string) => void;
    onCurrencyChange: (v: string) => void;
    onApply: () => void;
  }) => {
    const t = useTranslations("Navbar");

    return (
      <ModalContent className="text-dark max-w-[90%] mx-auto items-center gap-4 rounded-none bg-white p-5 sm:max-w-[80%] md:max-w-[28rem]">
        <ModalHeader className="flex flex-col gap-1  w-full">
          <h3 className="text-dark text-xl lg:text-2xl text-center w-full">
            {t("selectLang")}
          </h3>
        </ModalHeader>

        <ModalBody className="text-dark overflow-y-none flex w-full flex-col gap-4 p-0">
          <ModalBodyy
            title={t("language")}
            data={languages}
            value={selectedLanguage}
            onChange={onLanguageChange}
          />
          <ModalBodyy
            title={t("currency")}
            data={currency}
            value={selectedCurrency}
            onChange={onCurrencyChange}
          />
        </ModalBody>

        <ModalFooter className="flex w-full justify-end p-0">
          <Button
            className="bg-dark flex  cursor-pointer items-center justify-center rounded-none text-white transition hover:opacity-90"
            onClick={onApply}
          >
            {t("apply")}
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
);
LangCurrModalContent.displayName = "LangCurrModalContent";

export default function LangCurrButton({ data }: LangCurrButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { language, currency: curr, setLanguage, setCurrency } = useLangCurr();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedCurrency, setSelectedCurrency] = useState(curr);

  const handleOpen = useCallback(() => onOpen(), [onOpen]);

  const handleApply = useCallback(() => {
    setLanguage(selectedLanguage);
    setCurrency(selectedCurrency);
    onOpenChange();
  }, [selectedLanguage, selectedCurrency, setLanguage, setCurrency, onOpenChange]);

  const handleLanguageChange = useCallback((v: string) => setSelectedLanguage(v), []);
  const handleCurrencyChange = useCallback((v: string) => setSelectedCurrency(v), []);

  useEffect(() => {
    if (isOpen) {
      setSelectedLanguage(language);
      setSelectedCurrency(curr);
    }
  }, [isOpen, language, curr]);

  const modal = useMemo(
    () => (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="z-[9999]"
        scrollBehavior="inside"
        placement="center"
      >
        <LangCurrModalContent
          onClose={onOpenChange}
          selectedLanguage={selectedLanguage}
          selectedCurrency={selectedCurrency}
          onLanguageChange={handleLanguageChange}
          onCurrencyChange={handleCurrencyChange}
          onApply={handleApply}
        />
      </Modal>
    ),
    [
      isOpen,
      onOpenChange,
      selectedLanguage,
      selectedCurrency,
      handleLanguageChange,
      handleCurrencyChange,
      handleApply,
    ]
  );

  return (
    <>
      <LangCurrSwitcher onClick={handleOpen} data={data} />
      {modal}
    </>
  );
}
