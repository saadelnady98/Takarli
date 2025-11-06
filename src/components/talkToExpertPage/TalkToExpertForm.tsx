"use client"

import { AxiosError } from "axios"
import React, { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PhoneInput } from "react-international-phone"
import { ChevronDown, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { serverApiClient } from "@/lib/new-api-client"
import { useTranslations } from "next-intl"
import "react-international-phone/style.css"

import { talkToExpertSchema, TalkToExpertSchema } from "./validations/validation"
import IOSLikeTimePicker from "./time-picker"

export default function TalkToExpertForm() {
  const t = useTranslations("talkToExpert")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const contactMethodRef = useRef<HTMLDivElement>(null)
  const timePickerRef = useRef<HTMLDivElement>(null)

  const contactMethods = [
    t("methods.whatsapp"),
    t("methods.phone"),
    t("methods.telegram"),
  ]

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TalkToExpertSchema>({
    resolver: zodResolver(talkToExpertSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      method: "",
      time: "",
    },
  })

  const contactMethod = watch("method")
  const preferredTime = watch("time")

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contactMethodRef.current &&
        !contactMethodRef.current.contains(event.target as Node) &&
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const onSubmit = async (data: TalkToExpertSchema) => {
    try {
      await serverApiClient.post("/expert", data)
      toast.success(t("success"), {
        duration: 5000,
        position: "top-right",
      })
      reset()
    } catch (error) {
      const err = error as AxiosError<{ errors?: { message?: string } }>
      toast.error(err.response?.data?.errors?.message || t("error"), {
        duration: 5000,
        position: "top-right",
      })
    }
  }

  return (
    <section className="mx-2 mt-[2.625rem] mb-10 border border-[#d2d2d2] p-[1.5rem] lg:mb-25">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Row 1 */}
        <div className="mb-[1.5rem] flex flex-col gap-6 md:flex-row">
          <div className="flex-1">
            <label className="text-dark mb-2 block text-[0.875rem] font-medium">
              {t("firstName")}
            </label>
            <input
              {...register("firstName")}
              placeholder={t("placeholderFirst")}
              className={`w-full border ${
                errors.firstName ? "border-red-500" : "border-[#d2d2d2]"
              } px-[1rem] py-[1rem] text-[1.125rem] outline-none`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{t("validation.firstName")}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="text-dark mb-2 block text-[0.875rem] font-medium">
              {t("lastName")}
            </label>
            <input
              {...register("lastName")}
              placeholder={t("placeholderLast")}
              className={`w-full border ${
                errors.lastName ? "border-red-500" : "border-[#d2d2d2]"
              } px-[1rem] py-[1rem] text-[1.125rem] outline-none`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">{t("validation.lastName")}</p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="mb-[1.5rem] flex flex-col gap-6 md:flex-row">
          <div className="flex-1">
            <label className="text-dark mb-2 block text-[0.875rem] font-medium">
              {t("email")}
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder={t("placeholderEmail")}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-[#d2d2d2]"
              } px-[1rem] py-[1rem] text-[1.125rem] outline-none`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{t("validation.email")}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="text-dark mb-2 block text-[0.875rem] font-medium">
              {t("phone")}
            </label>
            <PhoneInput
              defaultCountry="ae"
              value={watch("phone")}
              onChange={(phone) => setValue("phone", phone)}
              inputClassName="!w-full !border-none !focus:ring-0 !outline-none !rounded-none"
              className={`w-full border ${
                errors.phone ? "border-red-500" : "border-[#d2d2d2]"
              } !flex !rounded-none px-[1rem] py-[.75rem] text-[1.125rem] outline-none`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{t("validation.phone")}</p>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div className="mb-[1.5rem] flex flex-col gap-6 md:flex-row">
          {/* Contact Method */}
          <div ref={contactMethodRef} className="relative flex-1">
            <label className="text-dark mb-2 block text-[0.875rem] font-medium">
              {t("contactMethod")}
            </label>
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(openDropdown === "contact" ? null : "contact")
              }
              className={`flex cursor-pointer w-full items-center justify-between border border-[#d2d2d2] px-[16px] py-[16px] text-[1.125rem] text-[#717171] hover:bg-black hover:text-white ${
                openDropdown === "contact" ? "bg-black text-white" : ""
              }`}
            >
              {contactMethod || t("contactMethod")}
              <ChevronDown
                className={`${
                  openDropdown === "contact" ? "rotate-180" : ""
                } h-4 w-4 transition-all duration-300`}
              />
            </button>

            {openDropdown === "contact" && (
              <div className="absolute z-10 mt-1 w-full border border-[#d2d2d2] bg-white shadow-lg">
                {contactMethods.map((method) => (
                  <label
                    key={method}
                    className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <input
                      type="radio"
                      value={method}
                      {...register("method")}
                      checked={contactMethod === method}
                      onChange={(e) => {
                        setValue("method", e.target.value, { shouldValidate: true })
                        setOpenDropdown(null)
                      }}
                      className="mr-2 accent-black"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            )}
            {errors.method && (
              <p className="mt-1 text-sm text-red-500">{t("validation.method")}</p>
            )}
          </div>

          {/* Preferred Time */}
          <div ref={timePickerRef} className="relative flex-1">
            <IOSLikeTimePicker
              value={preferredTime}
              onChange={(val) => setValue("time", val, { shouldValidate: true })}
              label={t("preferredTime")}
              placeholder={t("preferredTime")}
              done={t("done")}
              error={errors.time?.message}
              open={openDropdown === "time"}
              onOpenChange={(isOpen) => setOpenDropdown(isOpen ? "time" : null)}
            />
          </div>
        </div>

        {/* Message */}
        <div className="mb-[1.5rem]">
          <label className="text-dark mb-2 block text-[0.875rem] font-medium">
            {t("message")}
          </label>
          <textarea
            {...register("message")}
            placeholder={t("placeholderMessage")}
            className={`h-[12.5rem] w-full resize-none border ${
              errors.message ? "border-red-500" : "border-[#d2d2d2]"
            } pt-[1rem] pl-[1rem] outline-none`}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{t("validation.message")}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-[#1A1616] py-3 flex justify-center items-center gap-2 rounded-none text-[1.125rem] font-medium text-white hover:bg-black"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            t("submit")
          )}
        </button>
      </form>
    </section>
  )
}