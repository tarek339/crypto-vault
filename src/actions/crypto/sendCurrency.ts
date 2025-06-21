"use server";

import { UserProps, UxtoProps } from "@/interfaces/interfaces";
import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";
import * as bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import fs from "fs";
import * as ecc from "tiny-secp256k1";
import { getTransactionInfo } from "./getTransactionInfo";
import { validateAddress } from "./validateAddress";

bitcoin.initEccLib(ecc);
const ECPair = ECPairFactory(ecc);

export const sendCurrency = async (
  prev: unknown,
  formData?: FormData | null,
) => {
  await connectToDb();
  try {
    const id = formData?.get("id");
    const amountToSend = formData?.get("amountToSend")?.toString();
    const toAddress = formData?.get("toAddress")?.toString();

    if (!amountToSend) {
      return {
        success: false,
        error: 1,
      };
    }
    if (!amountToSend?.toString().match(/^\d+(\.\d+)?$/)) {
      return {
        success: false,
        error: 2,
      };
    }
    if (!toAddress) {
      return {
        success: false,
        error: 3,
      };
    }

    const user: UserProps | null = await User.findById(id);

    if (!user) {
      return {
        success: false,
        error: 5,
      };
    }

    // validate address and return error: 4 if invalid
    const isValid = await validateAddress(toAddress.toString());
    if (!isValid) {
      return {
        success: false,
        error: 4,
      };
    }

    const networkType = process.env.NETWORK_TYPE ?? "";

    const wallet = {
      fromAddress: user?.wallet.address,
      privateKey: user?.wallet.privateKey,
    };
    const { fromAddress, privateKey } = wallet;

    const network =
      process.env.NETWORK_TYPE === "mainnet"
        ? bitcoin.networks.bitcoin
        : bitcoin.networks.testnet;

    // 1. Fetch UTXOs
    const res = await fetch(
      `${process.env.MEMPOOL_API_URL}address/${fromAddress}/utxo`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch UTXOs");
    }

    const utxos: UxtoProps[] = await res.json();

    const satoshiToSend: number = +amountToSend * 100000000; // Convert to satoshis
    let totalAmountAvailable = 0;

    // 2. Initialize PSBT
    const transaction = new bitcoin.Psbt({ network: network });

    // 3. Add inputs
    for (const utxo of utxos) {
      const fullTxHex = await getTransactionInfo(utxo.txid);
      if (!fullTxHex) {
        throw new Error("Failed to fetch full transaction hex for UTXO");
      }
      transaction.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        nonWitnessUtxo: Buffer.from(fullTxHex, "hex"),
      });
      totalAmountAvailable += utxo.value;
    }

    // 4. Add output for the receiver
    transaction.addOutput({
      address: toAddress,
      value: Math.round(satoshiToSend), // Ensure integer not float,
    });

    const feeRes = await fetch(
      `${process.env.MEMPOOL_API_URL}v1/fees/recommended`,
    );

    if (!feeRes.ok) {
      throw new Error("Failed to fetch recommended fee rate");
    }
    const recommendedFees = await feeRes.json();

    // 5. Calculate fee and change
    const feeRate: number =
      networkType === "testnet" ? 1 : recommendedFees.fastestFee; // Default fee rate for testnet or use recommended fee

    const changeAmountSatoshi = totalAmountAvailable - satoshiToSend - feeRate;

    // Write transaction details to a file for debugging
    fs.writeFileSync(
      "transactionDetails.txt",
      `Total Amount Available: ${totalAmountAvailable}\n` +
        `Amount to Send: ${satoshiToSend}\n` +
        `Fee Rate: ${feeRate}\n` +
        `Change Amount Satoshi: ${changeAmountSatoshi}\n` +
        `From Address: ${fromAddress}\n` +
        `To Address: ${toAddress}\n`,
    );
    // Check if the total amount available is sufficient
    if (totalAmountAvailable < satoshiToSend + feeRate) {
      throw new Error(
        "Not enough funds to cover the transaction fee and send the amount",
      );
    }

    // 6. Add change output
    if (changeAmountSatoshi > 0 && fromAddress) {
      transaction.addOutput({
        address: fromAddress,
        value: Math.round(changeAmountSatoshi), // Ensure integer not float
      });
    }

    // 7. Keypair generation
    const keyPair = ECPair.fromWIF(privateKey, network);

    // 8. Sign inputs
    for (let i = 0; i < utxos.length; i++) {
      // Example custom signer if needed
      const signer = {
        publicKey: Buffer.from(keyPair.publicKey),
        sign: (hash: Buffer) => Buffer.from(keyPair.sign(hash)), // Convert Uint8Array to Buffer
        signSchnorr: undefined,
      };

      transaction.signInput(i, signer);
    }

    // 6. Finalise transaktion
    transaction.finalizeAllInputs();

    // 7. Extract transaction in hex format
    const rawTx = transaction.extractTransaction().toHex();

    // 9. Send transaction
    const rawTxRes = await fetch(`${process.env.MEMPOOL_API_URL}tx`, {
      method: "POST",
      body: rawTx,
    });

    if (!rawTxRes.ok) {
      throw new Error("Transaction faild");
    }

    const txRes = await rawTxRes.text();

    // Write transaction response details to a file for debugging
    fs.writeFileSync(
      "transactionResDetails.txt",
      `TX Response: ${txRes}\n` +
        `From Address: ${fromAddress}\n` +
        `To Address: ${toAddress}\n`,
    );

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
