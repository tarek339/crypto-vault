"use server";

import mongoose from "mongoose";
import { sendTelegramNotification } from "./telegram";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT!);
  } catch (error) {
    await sendTelegramNotification(
      `Connection error satus: ${mongoose.connection.readyState} - ${(error as Error).message}`,
    );
  }
};
