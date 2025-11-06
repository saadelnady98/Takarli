"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldValues, Path } from "react-hook-form";
import React from "react";

interface FormFieldInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "textarea";
  isHome?: boolean;
}

export function FormFieldInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isHome = false,
}: FormFieldInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className={isHome ? "text-white " : "text-dark lg:text-sm text-xs lg:font-medium"}>
            {label}
          </FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                {...field}
                placeholder={placeholder}
                className={`border-[rgba(169,169,169,1)] shadow-none lg:min-h-50 h-25 lg:text-lg text-xs p-4 outline-none lg:font-medium rounded-none  ${isHome ? "text-white placeholder:text-white/30" : "text-dark placeholder:text-dark/30"}`}
              />
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className={`border-[rgba(169,169,169,1)] shadow-none lg:text-lg text-xs p-4 outline-none lg:font-medium rounded-none placeholder:text-dark/30   min-h-[55px] ${isHome ? "text-white placeholder:text-white/30" : "text-dark placeholder:text-dark/30"}`}
              />
            )}
          </FormControl>
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
}
