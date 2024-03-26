"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const Page: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", {
        ...loginInfo,
        redirect: false,
      })
        .then((data) => {
          if (data?.error === "CredentialsSignin") {
            toast.error("Invalid Email or Password");
          }
          if (data?.ok) {
            router.refresh();
            toast.success("Login Success");
            router.push("/");
          }
        })
        .catch(() => toast.error("Something went wrong, Try again Later"));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="mx-auto mt-40 flex min-h-[200px] max-w-[400px] flex-col items-center justify-center gap-10">
        <h1 className="font-black text-gray-700 underline underline-offset-4">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="relative flex w-full flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="email"> Email</Label>
            <Input
              onChange={handleChange}
              value={loginInfo.email}
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
              value={loginInfo.password}
              name="password"
              id="password"
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <Button size="lg" className="text-[1rem] font-semibold tracking-wide">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Logging In..</p>
              </div>
            ) : (
              "Log In"
            )}
          </Button>
          <div className="flex w-full items-center justify-center">
            <p>Don&apos;t have an account ?</p>
            <Button
              type="button"
              variant={"link"}
              onClick={() => router.push("/register")}
            >
              Register here
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Page;
