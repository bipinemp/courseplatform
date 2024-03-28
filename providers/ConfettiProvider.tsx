"use client";

import { useConfettiStore } from "@/store/store";
import ReactConfetti from "react-confetti";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;

  return (
    <div className="z-[2000]">
      <ReactConfetti
        className="pointer-events-none"
        numberOfPieces={500}
        recycle={false}
        onConfettiComplete={() => {
          confetti.onClose();
        }}
      />
    </div>
  );
};
