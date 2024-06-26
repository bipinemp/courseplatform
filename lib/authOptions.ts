import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prismadb";
import { getUserByEmail, getUserById } from "@/actions/user";
import { UserRole } from "@prisma/client";

type CompletedCourse = {
  id: string;
  courseId: string;
  percentage: string;
  userId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
  role: UserRole;
  emailVerified: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  completedCourses: CompletedCourse[];
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = (await getUserByEmail(credentials?.email || "")) as User;

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.id = token.sub;
      }

      if (token.role && session.user) {
        session.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = (await getUserById(token.sub || "")) as User;

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
};
