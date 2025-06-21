"use server";

import { User } from "@/models/user";
import { createBtcAddress } from "./createBtcAddress";
import { migrateBalance } from "./migrateBalance";

export const generateNewBtcAddress = async (
  prev: unknown,
  formData: FormData,
) => {
  try {
    const id = formData.get("id");
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const networkType = process.env.NETWORK_TYPE || "testnet";

    const seed = user.wallet.seed;
    const prevAddress = user.wallet.address;
    const privateKey = user.wallet.privateKey;
    const derivationPath = user.wallet.derivationPath;
    const addressIndex = derivationPath.split("/").pop();

    const newAddress = await createBtcAddress(
      seed,
      (networkType as "testnet") || "mainnet",
      +addressIndex + 1,
    );

    await migrateBalance(prevAddress, newAddress?.address ?? "", privateKey);

    user.wallet.address = newAddress?.address;
    user.wallet.privateKey = newAddress?.privateKey;
    user.wallet.publicKey = newAddress?.publicKey;
    user.wallet.derivationPath = `m/84'/${networkType === "testnet" ? 1 : 0}'/0'/0/${+addressIndex + 1}`;

    await user.save();

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.error((error as Error).message);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
