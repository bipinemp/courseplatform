"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
            router.back();
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
      <div className="mx-auto mt-44 flex min-h-[200px] max-w-[400px] flex-col items-center justify-center gap-10">
        <h1 className="font-black text-gray-700">Login</h1>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <Input
            onChange={handleChange}
            value={loginInfo.email}
            name="email"
            type="email"
            placeholder="Enter Email"
            required
          />
          <Input
            onChange={handleChange}
            value={loginInfo.password}
            name="password"
            type="password"
            placeholder="Enter Password"
            required
          />
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
        </form>
      </div>
    </Container>
  );
};

export default Page;
