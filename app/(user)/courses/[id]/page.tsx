"use client";

import { setProgress } from "@/apis/apis";
import { useGetCourseDetails } from "@/apis/queries";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  params: { id: string | undefined };
}

const Page = ({ params: { id } }: Props) => {
  const queryClient = useQueryClient();
  const { data, isPending } = useGetCourseDetails(id || "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Boolean[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<string>("");

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
      const newCorrectAnswers = data.question.map((question) =>
        checkQuestionIdInProgressArray(question.id, data.progress),
      );
      setCorrectAnswers(newCorrectAnswers);
    }
  }, [data]);

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
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {showConfetti && <Confetti />}
      <Container>
        <div className="ml-52 mt-32 flex w-[850px] flex-col gap-5">
          <div className="flex w-fit items-center gap-3 rounded-md border border-input px-4 py-3 font-semibold text-gray-700 shadow">
            <p>Course</p>
            <span> | </span>
            <p>{data?.title}</p>
          </div>
          <div
            className="flex flex-col gap-3 font-semibold text-gray-600"
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
                      "cursor-pointer rounded border border-input px-5 py-4 shadow transition hover:border hover:border-primary/60 hover:bg-zinc-100",
                      {
                        "border border-primary/60 bg-zinc-100":
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
};

export default Page;
