import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

type SortOption = {
  label: string
  value: string
}

type Filters = {
  sort?: {
    value: string
  }
}

type MobileSortProps = {
  isMobileSortOpen: boolean
  setIsMobileSortOpen: (value: boolean) => void
  sortOptions: SortOption[]
  filters: Filters
  handleSortChange: (value: string) => void
}

const MobileSort = ({
  isMobileSortOpen,
  setIsMobileSortOpen,
  sortOptions,
  filters,
  handleSortChange,
}: MobileSortProps) => {
  return (
    <AnimatePresence>
      {isMobileSortOpen && (
        <motion.div
          className="fixed h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] flex w-full items-center justify-center bg-black/50 backdrop-blur-lg lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileSortOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-[90%]   overflow-y-auto bg-white px-4 pt-4 pb-8 shadow-xl"
          >
            <div className="mb-4 flex justify-center">
              <button
                onClick={() => setIsMobileSortOpen(false)}
                className="cursor-pointer rounded-full bg-gray-200 p-2 hover:bg-gray-300"
              >
                <X className="h-5 w-5 text-gray-800" />
              </button>
            </div>

            {/* Sort Options */}
            <ul className="flex flex-col">
              {sortOptions.map((option, i) => (
                <React.Fragment key={option.value}>
                  <li
                    onClick={() => {
                      setIsMobileSortOpen(false)
                      handleSortChange(option.value)
                    }}
                    className={`cursor-pointer px-2 py-4 text-[1rem] font-medium text-gray-800 ${
                      filters.sort?.value === option.value ? "bg-dark text-white" : ""
                    }`}
                  >
                    {option.label}
                  </li>
                  {i !== sortOptions.length - 1 && <hr className="border-gray-200" />}
                </React.Fragment>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileSort
