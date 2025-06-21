"use server";

import BIP32Factory from "bip32";
import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "tiny-secp256k1";

const bip32 = BIP32Factory(ecc);
bitcoin.initEccLib(ecc);

export const createBtcAddress = async (
  mnemonic: string,
  networkType: "testnet" | "mainnet",
  addressIndex: number,
) => {
  try {
    const network =
      networkType === "testnet"
        ? bitcoin.networks.testnet
        : bitcoin.networks.bitcoin;

    // 1. Überprüfe, ob die Mnemonik gültig ist
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error("Ungültige mnemonische Seed-Phrase.");
    }

    // 2. Erstelle einen Seed aus der mnemonischen Phrase
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // 3. Leite den Root-Knoten der Hierarchical Deterministic (HD) Wallet ab
    const root = bip32.fromSeed(seed, network);

    // 4. Definiere den Ableitungspfad
    const path =
      process.env.NETWORK_TYPE === "mainnet"
        ? `m/84'/0'/0'/0/${addressIndex}`
        : `m/84'/1'/0'/0/${addressIndex}`;

    // 5. Leite den Child-Knoten ab
    const child = root.derivePath(path);

    // 5. Get the private and public keys of the derived node
    const privateKey = child.privateKey ? child.toWIF() : "only public key";
    // 6. Erhalte den öffentlichen Schlüssel
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

    // 7. Generiere die Bitcoin-Adresse (P2WPKH - Native SegWit)
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: pubkeyBuffer,
      network,
    });

    const walletInfo = {
      seed: seed.toString("hex"),
      address: address,
      privateKey: privateKey,
      publicKey: pubkeyBuffer.toString("hex"),
    };

    return walletInfo;
  } catch (error) {
    console.error((error as Error).message);
  }
};
