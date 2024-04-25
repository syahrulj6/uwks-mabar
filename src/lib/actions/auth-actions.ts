"use server";

import * as bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { db } from "~/server/db";
import {
  compileActivationTemplate,
  compileResetPasswordTemplate,
  sendMail,
} from "~/lib/mail";
import { signJwt, verifiedJwt } from "~/lib/jwt";

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">,
) {
  const result = await db.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    },
  });

  const jwtUserId = signJwt({
    id: result.id,
  });

  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  const body = compileActivationTemplate(user.name, activationUrl);
  await sendMail({ to: user.email, subject: "ACTIVATE YOUR ACCOUNT!", body });

  return result;
}

type ActivateUserFn = (
  jwtUserId: string,
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFn = async (jwtUserId) => {
  const payload = verifiedJwt(jwtUserId);
  const userId = payload?.id;
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return "userNotExist";

  if (user.emailVerified) return "alreadyActivated";

  const result = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  return "success";
};

export async function forgotPassword(email: string) {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("The User Does Not Exist!");

  //  Send Email with Password Reset Link
  const jwtUserId = signJwt({
    id: user.id,
  });
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${jwtUserId}`;
  const body = compileResetPasswordTemplate(user.name, resetPassUrl);
  const sendResult = await sendMail({
    to: user.email,
    subject: "Reset Password",
    body: body,
  });
  return sendResult;
}

type ResetPasswordFn = (
  jwtUserId: string,
  password: string,
) => Promise<"userNotExist" | "success">;

export const resetPasswordActions: ResetPasswordFn = async (
  jwtUserId,
  password,
) => {
  const payload = verifiedJwt(jwtUserId);
  if (!payload) return "userNotExist";

  const userId = payload.id;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return "userNotExist";

  const result = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      password: await bcrypt.hash(password, 10),
    },
  });
  if (result !== null) return "success";
  else throw new Error("Something went wrong");
};
