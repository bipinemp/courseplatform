"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

const Page: React.FC = () => {
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        registerInfo,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="mx-auto mt-44 flex min-h-[200px] max-w-[400px] flex-col gap-10">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            onChange={handleChange}
            value={registerInfo.name}
            name="name"
            placeholder="Enter Username"
          />
          <Input
            onChange={handleChange}
            value={registerInfo.email}
            name="email"
            placeholder="Enter Email"
          />
          <Input
            onChange={handleChange}
            value={registerInfo.password}
            name="password"
            type="password"
            placeholder="Enter Password"
          />
          <Button>Register</Button>
        </form>
      </div>
    </Container>
  );
};

export default Page;
