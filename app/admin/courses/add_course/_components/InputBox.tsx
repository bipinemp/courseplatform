import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { TCourse } from "@/schemas/courseType";
import { cn } from "@/lib/utils";

interface InputBoxProps {
  name: keyof TCourse;
  placeholder: string;
  id: string;
  register: UseFormRegister<TCourse>;
  desc?: string;
  error?: string;
  label?: string;
  type?: string;
}

const InputBox = ({
  name,
  placeholder,
  id,
  register,
  desc,
  error,
  label,
  type,
}: InputBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label htmlFor={name as string}>{label}</Label>}
      <Input
        {...register(name)}
        id={id}
        type={type !== "" ? type : "text"}
        name={name as string}
        placeholder={placeholder}
        className={cn("border-content py-6", {
          "border-[2px] border-destructive placeholder:text-destructive":
            error !== "",
        })}
      />
      {label && (
        <span
          className={cn("text-xs opacity-80", {
            hidden: error !== "",
          })}
        >
          {desc}
        </span>
      )}
      {error && (
        <span className="pl-3 text-sm font-semibold text-destructive">
          ** {error}
        </span>
      )}
    </div>
  );
};

export default InputBox;
