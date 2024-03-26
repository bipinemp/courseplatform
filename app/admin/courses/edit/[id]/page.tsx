"use client";

import Container from "@/components/Container";
import {
  ChevronLeft,
  ChevronRight,
  CircleX,
  Edit,
  LayoutDashboard,
  ListChecks,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseSchema, TCourse } from "@/schemas/courseType";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse, updateCourse } from "@/apis/apis";
import toast from "react-hot-toast";
import Link from "next/link";
import InputBox from "../../add_course/_components/InputBox";
import NestedArray from "../../add_course/_components/NestedArray";
import { useGetCourseDetails } from "@/apis/queries";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string | undefined };
}

const Page = ({ params: { id } }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isPending: Loading } = useGetCourseDetails(id || "");

  const {
    register,
    control,
    handleSubmit,
    getValues,

    setValue,
    formState: { errors },
  } = useForm<TCourse>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      questionsCount: "",
      questions: [{ title: "", answers: [{ title: "" }], correctAnswer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateCourse,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["courseslist"] });
      toast.success("Course Edited Successfully");
      router.push("/admin/courses");
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async () => {
    const updatedData = {
      id: data?.id,
      ...getValues(),
    };

    mutate(updatedData);
  };

  useEffect(() => {
    if (data) {
      setValue("title", data?.title);
      setValue("description", data?.description);
      setValue("price", data?.price.toString());
      setValue("questionsCount", data?.questionsCount.toString());
      setValue("questions", data?.question as any);
    }
  }, [data, setValue]);

  if (Loading) {
    return (
      <Container>
        <div className="ml-64 mt-36">
          <Loader2 className="size-28 animate-spin text-primary" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-20 flex flex-col gap-16 pl-52 pt-32">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold opacity-90">Course Edit</h1>
            <p className="italic opacity-80">Complete all Fields</p>
          </div>
          <Link href={"/admin/courses"} className="flex items-center gap-2">
            <Button>
              <ChevronLeft className="size-6" />
              Go Back
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-20"
          >
            <div className="flex w-full flex-col gap-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <LayoutDashboard className="h-11 w-11 rounded-lg bg-primary/10 p-2" />
                Edit course details
              </h3>

              <div className="flex flex-col gap-6 rounded border bg-zinc-50 px-6 py-8 shadow dark:bg-neutral-900">
                <InputBox
                  name="title"
                  id="title"
                  placeholder="Enter Title..."
                  register={register}
                  error={errors?.title?.message || ""}
                  desc="Mention the Title that will appear in the course heading"
                  label="Course Title"
                />

                <InputBox
                  name="description"
                  id="description"
                  placeholder="Enter Description..."
                  register={register}
                  error={errors?.description?.message || ""}
                  desc="Mention the Description that describe about the course"
                  label="Course Description"
                />

                <InputBox
                  name="price"
                  id="price"
                  placeholder="Enter Price..."
                  register={register}
                  error={errors?.price?.message || ""}
                  desc="Mention the Price you want to charge for the Course"
                  label="Course Price"
                />

                <InputBox
                  name="questionsCount"
                  id="questionsCount"
                  placeholder="Enter Question Count..."
                  register={register}
                  error={errors?.questionsCount?.message || ""}
                  desc="Mention the number of questions in the course"
                  label="Questions Count"
                />
              </div>
            </div>

            <div className="flex w-full flex-col gap-6">
              <h3 className="flex items-center gap-3 font-semibold">
                <ListChecks className="h-11 w-11 rounded-lg bg-primary/10 p-2" />
                Edit Course Questions & Anwers
              </h3>

              <div className="flex flex-col gap-6 rounded border bg-zinc-50 px-6 py-8 shadow dark:bg-neutral-900">
                <Button
                  className="flex w-fit items-center gap-2"
                  type="button"
                  onClick={() =>
                    append({
                      title: "",
                      correctAnswer: "",
                      answers: [{ title: "" }],
                    })
                  }
                >
                  <PlusCircle className="h-5 w-5" />
                  Add Question
                </Button>
                {fields.map((field, index) => (
                  <div
                    className="flex flex-col items-center gap-10"
                    key={field.id}
                  >
                    <div className="flex w-full items-center justify-between gap-5 px-2">
                      <div className="relative mb-2 mt-5 flex h-[2px] w-full items-center justify-center gap-3 bg-primary/50">
                        <Button className="flex w-fit items-center gap-1 rounded bg-primary px-4 py-3 text-background">
                          Question <ChevronRight className="h-4 w-4" />{" "}
                          {index + 1}.
                        </Button>
                        {index > 0 && (
                          <Button
                            variant={"destructive"}
                            type="button"
                            className="flex items-center gap-2 rounded"
                            onClick={() => remove(index)}
                          >
                            <CircleX className="h-5 w-5" />
                            Remove Question
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between gap-4">
                      <div className="flex w-full flex-col gap-1">
                        <Label className="pl-2">Question</Label>

                        <Input
                          {...register(`questions.${index}.title`)}
                          placeholder="Enter Question"
                          className={cn("border-content py-6", {
                            "border-[2px] border-destructive placeholder:text-destructive":
                              errors?.questions?.[index]?.title?.message &&
                              errors?.questions?.[index]?.title?.message !== "",
                          })}
                        />
                        {errors?.questions?.[index]?.title?.message && (
                          <span className="pl-3 text-sm font-semibold text-destructive">
                            ** {errors.questions?.[index]?.title?.message}
                          </span>
                        )}
                      </div>

                      <div className="flex w-full flex-col gap-1">
                        <Label className="pl-2">Correct Answer</Label>
                        <Input
                          {...register(`questions.${index}.correctAnswer`)}
                          placeholder="Enter Correct Answer"
                          className={cn("border-content py-6", {
                            "border-[2px] border-destructive placeholder:text-destructive":
                              errors.questions?.[index]?.correctAnswer
                                ?.message &&
                              errors.questions?.[index]?.correctAnswer
                                ?.message !== "",
                          })}
                        />
                        {errors?.questions?.[index]?.correctAnswer?.message && (
                          <span className="pl-3 text-sm font-semibold text-destructive">
                            **{" "}
                            {errors.questions?.[index]?.correctAnswer?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <NestedArray
                      errors={errors}
                      control={control}
                      nestIndex={index}
                      register={register}
                      key={index}
                    />
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                type="submit"
                className="flex items-center gap-2 text-[1rem] font-semibold tracking-wide"
              >
                <Edit className="size-5" />
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <p>Editing Course...</p>
                  </div>
                ) : (
                  "Edit Course"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Page;
