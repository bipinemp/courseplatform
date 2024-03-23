"use client";

import { setProgress } from "@/apis/apis";
import { useGetCourseDetails } from "@/apis/queries";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Confetti from "react-confetti";

interface Props {
  params: { id: string | undefined };
}

const Page = ({ params: { id } }: Props) => {
  const queryClient = useQueryClient();
  const { data, isPending } = useGetCourseDetails(id || "");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Boolean[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

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

      const allQuestionsSolved = newCorrectAnswers.every((answer) => answer);
      if (allQuestionsSolved) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: setProgress,
    onSuccess() {
      toast.success("Correct Ansser");
      queryClient.invalidateQueries({ queryKey: ["coursedetails", id] });
      setCorrectAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentIndex] = true;
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
  ) => {
    const Data = { questionId, courseId };
    toast.loading("Checking Answer", {
      duration: 100,
    });
    if (
      answer.toString() ===
      data?.question[currentIndex]?.correctAnswer.toString()
    ) {
      mutate(Data);
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
        <div className="ml-52 mt-32 flex w-[850px] flex-col gap-4">
          <div
            className="flex flex-col gap-3 font-semibold text-gray-600"
            key={data?.question[currentIndex].title}
          >
            <h2>
              {currentIndex + 1}. {data?.question[currentIndex].title}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data?.question[currentIndex].answers.map((answer) => (
                <div key={answer.id}>
                  <p
                    className="cursor-pointer rounded border border-input px-5 py-4 shadow"
                    onClick={() =>
                      handleAnswerSubmit(
                        data?.question[currentIndex]?.id || "",
                        data?.id || "",
                        answer?.title,
                      )
                    }
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
