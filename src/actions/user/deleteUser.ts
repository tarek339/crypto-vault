"use server";

import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const deleteUser = async (prev: unknown, formData: FormData) => {
  await connectToDb();
  const cookie = await cookies();
  try {
    const id = formData.get("id");
    const password = formData.get("password");

    if (!password) {
      return {
        success: false,
        error: "Enter password",
      };
    }

    const findUser = await User.findById(id);

    const user = await User.findOne({
      userName: findUser.userName,
    });

    const isMatch = await bcrypt.compare(
      password?.toString() ?? "",
      findUser.password,
    );

    if (!user || !isMatch) {
      return {
        success: false,
        error: "Wrong password",
      };
    }

    cookie.delete("token");
    await User.findByIdAndDelete(id);

    return {
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
