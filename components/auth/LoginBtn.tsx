"use client";

import { useState } from "react";
import Google from "@/components/svg/Google";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LoginBtn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      console.log("login");
    } catch (error) {
      alert("Error while signing in with Google");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button
        disabled={isLoading}
        onClick={googleLogin}
        variant="default"
        size="lg"
        className="flex items-center gap-2 font-bold tracking-wider"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Google />
            <h3>SignIn With Google</h3>
          </>
        )}
      </Button>
    </div>
  );
};

export default LoginBtn;
