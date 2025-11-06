"use client";
import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown, X, RotateCcw } from "lucide-react";
import { FilterIcon } from "./filter-icons";
import { TranslationValues, useTranslations } from "next-intl";

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSort: () => void;
  onOpenFilters: () => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  resetButtonVariants: Variants;
  children: React.ReactNode;
}

export const MobileFilters: React.FC<MobileFiltersProps> = ({
  isOpen,
  onClose,
  onOpenSort,
  onOpenFilters,
  onReset,
  hasActiveFilters,
  resetButtonVariants,
  children,
}) => {
  const t = useTranslations("properties.filters");
  return (
    <>
      {/* Mobile Filters Button */}
      <div className="flex items-center justify-center gap-5 border px-4 py-4 lg:hidden">
        <MobileFilterButton
          icon="sort"
          label={t("sort")}
          onClick={onOpenSort}
        />
        <MobileFilterButton
          icon="filter"
          label={t("filters")}
          onClick={onOpenFilters}
        />
      </div>

      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {isOpen && (
          <MobileFiltersOverlay
            onClose={onClose}
            onReset={onReset}
            t={t}
            hasActiveFilters={hasActiveFilters}
            resetButtonVariants={resetButtonVariants}
          >
            {children}
          </MobileFiltersOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

const MobileFilterButton: React.FC<{
  icon: "sort" | "filter";
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="text-dark-grey flex cursor-pointer items-center gap-2 text-sm font-medium"
  >
    <FilterIcon type={icon} />
    {label}
    <ChevronDown className="ml-2 h-5 w-5 text-gray-800" />
  </button>
);

const MobileFiltersOverlay: React.FC<{
  onClose: () => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  resetButtonVariants: Variants;
  children: React.ReactNode;
  t:(key: string, values?: TranslationValues) => string;
}> = ({ onClose, onReset, hasActiveFilters, resetButtonVariants, children, t }) => (
  <motion.div
    className="fixed h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] flex w-full items-center justify-center bg-black/50 backdrop-blur-lg lg:hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-[90%]  overflow-y-auto bg-white px-4 pt-4 pb-8 shadow-xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="cursor-pointer rounded-full bg-gray-200 p-2 hover:bg-gray-300"
        >
          <X className="h-5 w-5 text-gray-800" />
        </button>
        <motion.button
          onClick={onReset}
          className="hover:bg-dark ms-auto flex w-fit cursor-pointer items-center justify-center border border-[#d4d4d4] px-4 py-2 transition-colors hover:text-white"
          variants={resetButtonVariants}
          initial="initial"
          animate={hasActiveFilters ? "pulse" : "initial"}
          whileHover="hover"
          whileTap="tap"
        >
          <RotateCcw className="me-3 h-5 w-5" /> {t("resetFilters")}
        </motion.button>
      </div>
      {children}
    </motion.div>
  </motion.div>
);