"use client";

import { setCourseEnrollment, setProgress } from "@/apis/apis";
import { useGetCourseDetails, useGetUserDetails } from "@/apis/queries";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Loader2, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import { cn } from "@/lib/utils";
import CourseDetailLoading from "@/components/CourseDetailLoading";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: string | undefined };
}

const Page = ({ params: { id } }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isPending } = useGetCourseDetails(id || "");
  const { data: UserDetail } = useGetUserDetails(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Boolean[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<string>("");
  const [isCoursePurchased, setIsCoursePurchased] = useState<boolean>(
    UserDetail?.enrollment?.some(
      (enrollment) => enrollment.course.id === data?.id,
    ) || false,
  );

  function checkQuestionIdInProgressArray(
    questionId: string,
    progressArray: Progress[],
  ) {
    for (const item of progressArray) {
      if (item.questionId === questionId) {
        return true; // QuestionId exists in progress array
      }
    }
    return false; // QuestionId does not exist in progress array
  }

  useEffect(() => {
    // Initialize correctAnswers array with progress data
    if (data) {
      const newCorrectAnswers = data?.question?.map((question) =>
        checkQuestionIdInProgressArray(question.id, data.progress),
      );
      setCorrectAnswers(newCorrectAnswers);
      const isPurchased = UserDetail?.enrollment?.some(
        (enrollment) => enrollment.course.id === data?.id,
      );
      setIsCoursePurchased(isPurchased || false);
    }
  }, [data, UserDetail]);

  const { mutate } = useMutation({
    mutationFn: setProgress,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["coursedetails", id] });
      queryClient.invalidateQueries({ queryKey: ["usercourses"] });

      setCorrectAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentIndex] = true;

        // Check if all questions are solved after updating correctAnswers
        const allQuestionsSolved = newAnswers.every((answer) => answer);
        if (allQuestionsSolved) {
          setShowConfetti(true); // Show confetti if all questions are solved
          setTimeout(() => setShowConfetti(false), 5000);
        }

        return newAnswers;
      });
    },
    onError(data) {
      toast.error(data.message);
    },
  });

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

  const handleAnswerSubmit = (
    questionId: string,
    courseId: string,
    answer: string,
    answerId: string,
  ) => {
    const isLastQuestion = currentIndex === (data?.question.length ?? 0) - 1;
    setSelectedAnswerIndex(answerId);

    const Data = { questionId, courseId };

    if (
      answer.toString() ===
      data?.question[currentIndex]?.correctAnswer.toString()
    ) {
      toast.success("Correct Ansser");
      if (!checkQuestionIdInProgressArray(questionId, data?.progress)) {
        mutate(Data);
      }

      if (isLastQuestion && correctAnswers.every((answer) => answer)) {
        setShowConfetti(true); // Show confetti if last question is correct
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } else {
      toast.error("Incorrect answer");
    }
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentIndex(currentIndex - 1);
  };

  if (isPending) {
    return <CourseDetailLoading />;
  }

  let content: React.ReactNode;

  const formattedPrice = new Intl.NumberFormat("np").format(data?.price ?? 0);

  if (isCoursePurchased) {
    content = (
      <>
        {showConfetti && <Confetti />}
        <Container>
          <div className="ml-52 mt-32 flex w-[850px] flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex w-fit items-center gap-3 rounded-md border border-input px-4 py-3 font-semibold opacity-80 shadow">
                <p>Course</p>
                <span> | </span>
                <p>{data?.title}</p>
              </div>
              <div>
                <p className="font-semibold opacity-80">
                  Questions ( {currentIndex + 1} / {data?.question.length} )
                </p>
              </div>
            </div>
            <div
              className="flex flex-col gap-3 font-semibold opacity-80"
              key={data?.question[currentIndex].title}
            >
              <h2 className="flex min-h-[75px] items-center">
                {currentIndex + 1}. {data?.question[currentIndex].title}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {data?.question[currentIndex].answers.map((answer) => (
                  <div key={answer.id}>
                    <p
                      className={cn(
                        "cursor-pointer rounded border border-input px-5 py-4 shadow transition hover:border hover:border-primary/60 hover:bg-zinc-100 dark:hover:bg-neutral-900",
                        {
                          "border border-primary/60 bg-zinc-100 dark:bg-neutral-900":
                            selectedAnswerIndex === answer.id,
                        },
                      )}
                      onClick={() => {
                        handleAnswerSubmit(
                          data?.question[currentIndex]?.id || "",
                          data?.id || "",
                          answer?.title,
                          answer?.id,
                        );
                        setSelectedAnswerIndex(answer.id);
                      }}
                    >
                      {answer.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <Button
                className="flex w-fit items-center gap-2"
                onClick={() => handlePreviousQuestion()}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" /> Previous
              </Button>
              <Button
                className="flex w-fit items-center gap-2"
                onClick={() => handleNextQuestion()}
                disabled={
                  data?.question.length === currentIndex + 1 ||
                  !correctAnswers[currentIndex]
                }
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </>
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
