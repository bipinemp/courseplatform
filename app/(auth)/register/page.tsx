"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/apis/apis";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page: React.FC = () => {
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState<TRegister>({
    name: "",
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Register Success");
      router.push("/login");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(registerInfo);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="mx-auto mt-44 flex min-h-[200px] max-w-[400px] flex-col items-center justify-center gap-10">
        <h1 className="font-black text-gray-700">Register</h1>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <Input
            onChange={handleChange}
            value={registerInfo.name}
            name="name"
            placeholder="Enter Username"
            required
          />
          <Input
            onChange={handleChange}
            value={registerInfo.email}
            name="email"
            placeholder="Enter Email"
            required
          />
          <Input
            onChange={handleChange}
            value={registerInfo.password}
            name="password"
            type="password"
            placeholder="Enter Password"
            required
          />
          <Button size="lg" className="text-[1rem] font-semibold tracking-wide">
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Page;
