"use server";

import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";
import bcrypt from "bcrypt";

export const changePassword = async (prev: unknown, formData: FormData) => {
  await connectToDb();
  try {
    const password = formData.get("password")?.toString() ?? "";
    const id = formData.get("id");

    const user = await User.findById(id);

    if (!user) {
      return {
        success: false,
        error: 1,
      };
    }

    const isMatch = await bcrypt.compare(
      password?.toString() ?? "",
      user.password,
    );
    if (isMatch) {
      return {
        success: false,
        error: 2,
      };
    }

    const hash = await bcrypt.hash(password.toString(), 10);
    user.password = hash;

    await user.save();

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
