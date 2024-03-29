"use client";

import { setCourseEnrollment, setProgress } from "@/apis/apis";
import { useGetCourseDetails, useGetUserDetails } from "@/apis/queries";
import Container from "@/components/Container";
import CourseDetailLoading from "@/components/CourseDetailLoading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Loader2, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  params: { id: string | undefined };
}

const Page = ({ params: { id } }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { onOpen } = useConfettiStore();
  const { data, isPending } = useGetCourseDetails(id || "");
  const { data: UserDetail } = useGetUserDetails(true);
  const [isCoursePurchased, setIsCoursePurchased] = useState<boolean>(
    UserDetail?.enrollment?.some(
      (enrollment) => enrollment.course.id === data?.id,
    ) || false,
  );

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<string>("");
  // index for the particular question
  const [currentQuesIndex, setCurrentQuesIndex] = useState<number>(0);
  // for tracking currentIndex question's correct answer
  const [correctAnswer, setCorrectAnswer] = useState(
    data?.question[currentQuesIndex]?.correctAnswer || "",
  );

  const [solvedQuestionsIds, setSolvedQuestionsIds] = useState<string[]>([]);

  const { mutate: EnrollCourse, isPending: Enrolling } = useMutation({
    mutationFn: setCourseEnrollment,
    onSuccess(response: any) {
      router.push(response.data.payment_url);
      queryClient.invalidateQueries({ queryKey: ["cousedetails", data?.id] });
      queryClient.invalidateQueries({ queryKey: ["userDetail"] });
    },

    onError(error: Error) {
      toast.error(error?.message);
    },
  });

  const handleCoursePayment = (name: string, price: number, id: string) => {
    const data = { name, price, id };
    EnrollCourse(data);
  };

  const { mutate } = useMutation({
    mutationFn: setProgress,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cousedetails", data?.id] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleAnswerSubmit = (answer: string, questionId: string) => {
    if (answer.toLowerCase().trim() !== correctAnswer.toLowerCase().trim()) {
      toast.error("Incorrect Answer");
    } else {
      toast.success("Correct Answer");

      // whenever the user completes the last question again and again
      if (
        currentQuesIndex + 1 === data?.question.length &&
        solvedQuestionsIds.length === data?.question.length
      ) {
        onOpen();
      }

      // Only update progress if this question has not been answered correctly before
      if (
        !solvedQuestionsIds.includes(data?.question[currentQuesIndex]?.id || "")
      ) {
        const newSolvedQuestionsIds = [...solvedQuestionsIds, questionId];
        setSolvedQuestionsIds(newSolvedQuestionsIds);

        // for first completing the last question
        if (
          currentQuesIndex + 1 === data?.question.length &&
          newSolvedQuestionsIds.length === data?.question.length
        ) {
          onOpen();
        }

        // Calculate progress based on the number of correct answers
        const progress =
          data && (newSolvedQuestionsIds.length / data?.question?.length) * 100;

        const sendData = {
          progress: parseInt(progress?.toFixed(0) || ""),
          courseId: data?.id,
          completedQuestions: newSolvedQuestionsIds,
          totalQuestions: data?.question.length,
        };

        mutate(sendData);
      }
    }
  };

  useEffect(() => {
    if (data) {
      const userCourseProgress = data?.CourseProgress.find(
        (progress) => progress.userId === UserDetail?.id,
      );
      setSolvedQuestionsIds(userCourseProgress?.completedQuestions || []);
      setCorrectAnswer(data?.question[currentQuesIndex]?.correctAnswer);
      const isPurchased = UserDetail?.enrollment?.some(
        (enrollment) => enrollment.course.id === data?.id,
      );
      setIsCoursePurchased(isPurchased || false);
    }
  }, [data, UserDetail, currentQuesIndex]);

  if (isPending) {
    return <CourseDetailLoading />;
  }

  let content: React.ReactNode;

  const formattedPrice = new Intl.NumberFormat("np").format(data?.price ?? 0);

  if (isCoursePurchased) {
    content = (
      <Container>
        <div className="ml-52 mt-32 flex w-[850px] flex-col gap-5">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-fit items-center gap-3 rounded-md border border-input px-4 py-3 font-semibold opacity-80 shadow">
              <p>Course</p>
              <span> | </span>
              <p>{data?.title}</p>
            </div>
            <div>
              <p className="font-semibold opacity-80">
                Questions ( {currentQuesIndex + 1} / {data?.question.length} )
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 font-semibold opacity-80">
            <h2 className="flex min-h-[75px] items-center">
              {currentQuesIndex + 1}. {data?.question[currentQuesIndex]?.title}
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {data?.question[currentQuesIndex]?.answers.map((answer) => (
                <p
                  key={answer.id}
                  onClick={() => {
                    handleAnswerSubmit(
                      answer.title,
                      data?.question[currentQuesIndex].id,
                    );
                    setSelectedAnswerIndex(answer.id);
                  }}
                  className={cn(
                    "cursor-pointer rounded border border-input px-5 py-4 shadow transition hover:border hover:border-primary/60 hover:bg-zinc-100 dark:hover:bg-neutral-900",
                    {
                      "border border-primary/60 bg-zinc-100 dark:bg-neutral-900":
                        selectedAnswerIndex === answer.id,
                    },
                  )}
                >
                  {answer.title}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4">
              <Button
                className="flex w-fit items-center gap-2"
                disabled={
                  currentQuesIndex === 0 ||
                  currentQuesIndex === data?.question.length
                }
                onClick={() => setCurrentQuesIndex(currentQuesIndex - 1)}
              >
                <ChevronLeft className="h-5 w-5" /> Previous
              </Button>
              <Button
                className="flex w-fit items-center gap-2"
                disabled={
                  !solvedQuestionsIds.includes(
                    data?.question[currentQuesIndex]?.id || "",
                  ) || currentQuesIndex + 1 === data?.question?.length
                }
                onClick={() => setCurrentQuesIndex(currentQuesIndex + 1)}
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    );
  } else {
    content = (
      <Container>
        <div className="ml-52 mt-40 flex h-[300px] w-[850px] flex-col items-center gap-5">
          <span className="w-fit rounded-full bg-destructive/20 p-3 text-destructive">
            <ShieldAlert className="h-20 w-20" />
          </span>
          <h1 className="font-black opacity-85">
            Purchase this course to view the content
          </h1>
          <div className="flex flex-col items-center rounded-md border border-input px-4 py-3 shadow">
            <h2 className="font-semibold">{data?.title}</h2>
            <p className="opacity-80">{data?.description}</p>
          </div>
          <Button
            onClick={() =>
              handleCoursePayment(
                data?.title || "",
                data?.price || 0,
                data?.id || "",
              )
            }
            className="w-fit py-7 text-2xl font-semibold"
            size={"lg"}
          >
            {Enrolling ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Enrolling...</p>
              </div>
            ) : (
              `Enroll for Rs. ${formattedPrice}`
            )}
          </Button>
        </div>
      </Container>
    );
  }

  return content;
};

export default Page;
