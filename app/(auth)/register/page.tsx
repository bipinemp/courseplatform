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
import { Label } from "@/components/ui/label";

const Page: React.FC = () => {
  const router = useRouter();
  const [registerInfo, setRegisterInfo] = useState<TRegister>({
    name: "",
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.response?.status && data?.response.status === 401) {
        toast.error("Email Already Used");
      }
      if (data?.status === 200) {
        toast.success("Register Success");
        router.push("/login");
      }
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
      <div className="mx-auto mt-40 flex min-h-[200px] max-w-[400px] flex-col items-center justify-center gap-10">
        <h1 className="font-black underline underline-offset-4 opacity-80">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name"> Name</Label>
            <Input
              onChange={handleChange}
              value={registerInfo.name}
              name="name"
              id="name"
              placeholder="Enter Username"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email"> Email</Label>
            <Input
              onChange={handleChange}
              value={registerInfo.email}
              name="email"
              id="email"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password"> Password</Label>
            <Input
              onChange={handleChange}
              value={registerInfo.password}
              name="password"
              id="password"
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>

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
          <div className="flex w-full items-center justify-center">
            <p>Already have an account ?</p>
            <Button
              type="button"
              variant={"link"}
              onClick={() => router.push("/login")}
            >
              Login here
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Page;
