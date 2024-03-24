import { UserRole } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

interface CompletedCourse {
  id: string;
  courseId: string;
  percentage: string;
  userId: string;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    id: string;
    role: UserRole;
    completedCourses: CompletedCourse[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: UserRole;
    completedCourses: CompletedCourse[];
  }
}
