import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  wallet: {
    seed: {
      type: String,
    },
    address: {
      type: String,
    },
    privateKey: {
      type: String,
    },
    publicKey: {
      type: String,
    },
    derivationPath: {
      type: String,
    },
  },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
