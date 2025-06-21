"use server";

import BIP32Factory from "bip32";
import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";

const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);

export const createBtcWallet = async (networkType: "testnet" | "mainnet") => {
  try {
    const network =
      networkType === "testnet"
        ? bitcoin.networks.testnet
        : bitcoin.networks.bitcoin;

    // 1. Generate a mnemonic seed phrase (12 words)
    const mnemonic = bip39.generateMnemonic();

    // 2. Create a seed from the mnemonic phrase
    const seed = await bip39.mnemonicToSeed(mnemonic); // **THE NEW SEED**

    // 3. Derive the root node of the Hierarchical Deterministic (HD) wallet
    const root = bip32.fromSeed(seed, network);

    // 4. Derive a child node for the first external address (standard path for BIP44/BIP84)
    const path =
      process.env.NETWORK_TYPE === "mainnet"
        ? "m/84'/0'/0'/0/0"
        : "m/84'/1'/0'/0/0"; // Example for Native SegWit
    const child = root.derivePath(path);

    // 5. Get the private and public keys of the derived node
    const privateKey = child.privateKey ? child.toWIF() : "only public key";
    const publicKey = child.publicKey;

    let pubkeyBuffer;
    if (publicKey instanceof Buffer) {
      pubkeyBuffer = publicKey;
    } else if (publicKey instanceof Uint8Array) {
      pubkeyBuffer = Buffer.from(publicKey);
    } else {
      console.error("Unexpected type for publicKey:", publicKey);
      // Handle the error appropriately, e.g., throw an exception or return null
      throw new Error(
        "Unexpected public key type.  Expected Buffer or Uint8Array.",
      );
    }

    // 6. Generate the Bitcoin address
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: pubkeyBuffer,
      network,
    });

    const walletInfo = {
      seed: mnemonic,
      address: address,
      privateKey: privateKey,
      publicKey: pubkeyBuffer.toString("hex"),
      derivationPath: path,
    };

    return walletInfo;
  } catch (error) {
    console.error((error as Error).message);
  }
};
