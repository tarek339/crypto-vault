import { connectToDb } from "./mongoose";

export const checkConnection = async () => {
  setInterval(async () => {
    await connectToDb();
  }, 60 * 1000);
};
