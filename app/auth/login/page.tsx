"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

const Page: React.FC = () => {
  const session = useSession();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      signIn("credentials", {
        ...loginInfo,
        redirect: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="mx-auto mt-44 flex min-h-[200px] max-w-[400px] flex-col gap-10">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            onChange={handleChange}
            value={loginInfo.email}
            name="email"
            placeholder="Enter Email"
          />
          <Input
            onChange={handleChange}
            value={loginInfo.password}
            name="password"
            type="password"
            placeholder="Enter Password"
          />
          <Button>Login</Button>
        </form>
      </div>
    </Container>
  );
};

export default Page;
