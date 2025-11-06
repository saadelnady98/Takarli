"use client";
import { SharedInputProps } from "@/types/interfaceData";
import { Input } from "@heroui/react";
import React from "react";

export default function SharedInput({
  errorText,
  errors_input,
  label,
  labelPlacement,
  name,
  placeholder,
  labelClassName,
  inputClassName,
  inputWrapperClassName,
  type,
}: SharedInputProps) {
  return (
    <>
      <Input
        isRequired
        errorMessage={({ validationDetails }) => {
          if (validationDetails.valueMissing) {
            // "Please enter your name"
            return errorText;
          }
          //   errors.firstName
          return errors_input;
        }}
        // First Name
        label={label}
        labelPlacement={labelPlacement}
        name={name}
        type={type}
        placeholder={placeholder}
        classNames={{
          label: labelClassName,
          input: inputClassName,
          inputWrapper: inputWrapperClassName,
          //   label: "!text-white !text-[0.875rem] !font-medium !pb-[0.563rem]", // اللابل أبيض
          //   input: " !text-white !rounded-none ", // خلفية سوداء + كتابة رصاصي + بدون راديوس
          //   inputWrapper:
          //     "!bg-black !border !border-gray-500 !rounded-none w-full md:w-[17rem] h-[3.438rem]", // ريسبونسيف: 100% موبايل + 272px ديسكتوب
        }}
      />
    </>
  );
}
