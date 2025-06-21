"use server";

import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { createBtcWallet } from "../crypto/createBtcWallet";

export const signUp = async (prev: unknown, formData: FormData) => {
  await connectToDb();
  const cookie = await cookies();
  try {
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    const userName = formData.get("userName");
    const password = formData.get("password")?.toString() ?? "";

    const findUser = await User.findOne({
      userName: userName?.toString().toLocaleLowerCase(),
    });

    if (findUser) {
      return {
        success: false,
        error: 5,
      };
    }

    const hash = await bcrypt.hash(password.toString(), 10);

    const networkType = process.env.NETWORK_TYPE;

    const walletResponse = await createBtcWallet(
      networkType as "testnet" | "mainnet",
    );

    const user = new User({
      userName: userName?.toString().toLocaleLowerCase(),
      password: hash,
      wallet: walletResponse || {
        seed: "",
        address: "",
        privateKey: "",
        publicKey: "",
        derivationPath: "",
      },
    });

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

    await user.save();

    const id = String(user._id);

    return {
      id: id,
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
