"use server";

export const fetchTransactions = async (address: string) => {
  try {
    const res = await fetch(
      `${process.env.MEMPOOL_API_URL}address/${address}/txs`,
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error((error as Error).message);
  }
};
