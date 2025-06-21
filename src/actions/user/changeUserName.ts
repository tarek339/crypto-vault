"use server";

import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";

export const changeUserName = async (prev: unknown, formData: FormData) => {
  await connectToDb();
  try {
    const userName = formData.get("userName");
    const id = formData.get("id");

    if (!userName) {
      return {
        success: false,
        error: 1,
      };
    }

    const findUser = await User.findOne({
      userName: userName?.toString().toLocaleLowerCase(),
    });

    if (findUser) {
      return {
        success: false,
        error: 2,
      };
    }

    const user = await User.findById(id);

    user.userName = userName.toString().toLocaleLowerCase();

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
