import { db } from "~/server/db";
import { AuthOptions } from "next-auth";
import * as bcrypt from "bcryptjs";

import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "userName",
          type: "text",
          placeholder: "Your Username",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) throw new Error("Username or Password is not correct!");

        if (!credentials?.password)
          throw new Error("Please provide your password!");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordCorrect)
          throw new Error("Username or Password is not correct");

        if (!user.emailVerified)
          throw new Error("Please verify your email first");

        const { password, ...userWithoutPass } = user;

        return userWithoutPass;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
