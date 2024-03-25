"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TCourse } from "@/schemas/courseType";
import { CircleX, PlusCircle } from "lucide-react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

interface NestedArrayProps {
  errors: FieldErrors<TCourse>;
  nestIndex: number;
  control: Control<TCourse>;
  register: UseFormRegister<TCourse>;
}

const NestedArray = ({
  errors,
  control,
  nestIndex,
  register,
}: NestedArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${nestIndex}.answers`,
  });

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full items-center justify-end gap-5 px-2">
        <Button
          className="flex w-fit items-center gap-2"
          type="button"
          onClick={() =>
            append({
              title: "",
            })
          }
        >
          <PlusCircle className="h-5 w-5" />
          Add Answer
        </Button>
      </div>
      {fields.map((field, index) => (
        <div className="flex flex-col gap-4" key={field.id}>
          <div className="flex w-full items-center gap-2">
            <p
              className={cn("w-[110px] font-semibold", {
                "w-[140px]": index + 1 > 1,
              })}
            >
              Answer {index + 1}.)
            </p>

            <div className="flex w-full flex-col gap-1">
              <Input
                {...register(`questions.${nestIndex}.answers.${index}.title`)}
                placeholder="Enter Answer"
                className={cn("border-content w-full py-6", {
                  "border-[2px] border-destructive placeholder:text-destructive":
                    errors?.questions?.[nestIndex]?.answers?.[index]?.title
                      ?.message &&
                    errors?.questions?.[nestIndex]?.answers?.[index]?.title
                      ?.message !== "",
                })}
              />
              {errors?.questions?.[nestIndex]?.answers?.[index]?.title
                ?.message && (
                <span className="pl-3 text-sm font-semibold text-destructive">
                  **{" "}
                  {
                    errors?.questions?.[nestIndex]?.answers?.[index]?.title
                      ?.message
                  }
                </span>
              )}
            </div>

            {index > 0 && (
              <Button
                variant={"destructive"}
                type="button"
                className="flex items-center gap-2"
                onClick={() => remove(index)}
              >
                <CircleX className="h-5 w-5" />
                Remove Answer
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NestedArray;
