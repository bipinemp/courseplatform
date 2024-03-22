import { getServerSession } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";

const LoginBtn = async () => {
  const session = await getServerSession();
  if (Boolean(session?.user)) {
    return;
  }
  return (
    <Link href={"/login"}>
      <Button>Login</Button>
    </Link>
  );
};

export default LoginBtn;
