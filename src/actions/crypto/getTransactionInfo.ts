"use server";

export const getTransactionInfo = async (txId: string) => {
  try {
    const res = await fetch(`${process.env.MEMPOOL_API_URL}tx/${txId}/hex`);

    if (!res.ok) {
      throw new Error("Failed to fetch transaction details");
    }
    const transactionDetails = await res.text();

    return transactionDetails;
  } catch (error) {
    console.error("Error in getTransactionInfo:", (error as Error).message);
  }
};
