"use server";

import { cookies } from "next/headers";

export const signOut = async () => {
  const cookie = await cookies();
  try {
    cookie.delete("token");
  } catch (error) {
    console.error((error as Error).message);
  }
};
