"use server";

import { UxtoProps } from "@/interfaces/interfaces";
import { connectToDb } from "@/lib/mongoose";
import * as bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import fs from "fs";
import * as ecc from "tiny-secp256k1";
import { getTransactionInfo } from "./getTransactionInfo";

bitcoin.initEccLib(ecc);
const ECPair = ECPairFactory(ecc);

export const migrateBalance = async (
  prevAddress: string,
  newAddress: string,
  privateKey: string,
) => {
  await connectToDb();
  try {
    const fromAddress = prevAddress;
    const toAddress = newAddress;

    // const networkType = process.env.NETWORK_TYPE ?? "";

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

    if (totalAmountAvailable <= 0) {
      return;
    }

    // 4. Add output for the receiver
    transaction.addOutput({
      address: toAddress,
      value: Math.round(totalAmountAvailable), // Ensure integer not float,
    });

    // const feeRes = await fetch(
    //   `${process.env.MEMPOOL_API_URL}v1/fees/recommended`,
    // );

    // if (!feeRes.ok) {
    //   throw new Error("Failed to fetch recommended fee rate");
    // }
    // const recommendedFees = await feeRes.json();

    // 5. Calculate fee and change
    const feeRate: number = 0;
    //   networkType === "testnet" ? 1 : recommendedFees.fastestFee;
    // const feeRate: number = 0;

    const changeAmountSatoshi = totalAmountAvailable - feeRate;

    // 6. Add change output
    transaction.addOutput({
      address: toAddress,
      value: Math.round(changeAmountSatoshi), // Ensure integer not float
    });

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

      console.log(signer.publicKey.toString("hex"));

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

    // Write transaction details to a file for debugging
    fs.writeFileSync(
      "migrateBalance.txt",
      `Total Amount Available: ${totalAmountAvailable}\n` +
        `Amount to Send: ${totalAmountAvailable}\n` +
        // `Fee Rate: ${feeRate}\n` +
        // `Change Amount Satoshi: ${changeAmountSatoshi}\n` +
        `From Address: ${fromAddress}\n` +
        `To Address: ${toAddress}\n` +
        `TX Response: ${txRes}`,
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
