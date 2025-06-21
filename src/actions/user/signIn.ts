"use server";

import { UserProps } from "@/interfaces/interfaces";
import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const signIn = async (prev: unknown, formData: FormData) => {
  await connectToDb();
  const cookie = await cookies();

  try {
    const userName = formData.get("userName");
    const password = formData.get("password");

    const user: UserProps | null = await User.findOne({
      userName: userName?.toString().toLocaleLowerCase(),
    });

    if (!user) {
      return {
        success: false,
        error: 1,
      };
    }

    const isMatch = await bcrypt.compare(
      password?.toString() ?? "",
      user.password ?? "",
    );

    if (!isMatch) {
      return {
        success: false,
        error: 2,
      };
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_TOKEN!,
      {
        expiresIn: "1h",
      },
    );

    cookie.set("token", token);

    const id = String(user._id);

    return {
      id: id,
      success: true,
      error: "",
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
