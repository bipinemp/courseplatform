"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getUserDetailsforUpdate, updateUserProfile } from "@/apis/apis";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const { data, isPending } = useQuery<UserDetail>({
    queryKey: ["userdetailupdate"],
    queryFn: getUserDetailsforUpdate,
  });

  const [userInfo, setUserInfo] = useState({
    name: data?.name || "",
    email: data?.email || "",
  });

  const [isUserInfoChanged, setIsUserInfoChanged] = useState(false);

  useEffect(() => {
    if (data) {
      setUserInfo({ name: data?.name, email: data?.email });
    }
  }, [data]);

  const { mutate, isPending: isUpdating } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess() {
      toast.success("Profile Updated Successfully");
      router.refresh();
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUserInfoChanged) {
      if (userInfo.name !== "" && userInfo.email !== "") {
        mutate(userInfo);
      } else {
        toast.error("Please fill all the fields");
      }
    } else {
      toast.error("No changes to update");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
    setIsUserInfoChanged(true);
  };

  if (isPending) {
    return (
      <Container>
        <div className="ml-[19rem] mt-[13rem]">
          <Loader2 className="size-20 animate-spin text-primary" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-32 flex w-full flex-col items-center gap-7 md:items-start md:pl-52">
        <h1 className="text-[1.5rem] font-bold underline underline-offset-4 opacity-80 md:text-[2rem]">
          Update Profile
        </h1>
        <form
          onSubmit={handleFormSubmit}
          className="vsm:w-[300px] flex w-full flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="name" className="pl-1">
              Name
            </Label>
            <Input
              defaultValue={userInfo.name}
              value={userInfo.name}
              id="name"
              name="name"
              onChange={handleInputChange}
              placeholder="Enter Name..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="pl-1">
              Email
            </Label>
            <Input
              defaultValue={userInfo.email}
              value={userInfo.email}
              id="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Enter Email..."
            />
          </div>
          <Button
            disabled={!isUserInfoChanged}
            size="lg"
            type="submit"
            className="text-[1rem] font-semibold tracking-wide"
          >
            {isUpdating ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Updating..</p>
              </div>
            ) : (
              "Update Profile"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Page;
