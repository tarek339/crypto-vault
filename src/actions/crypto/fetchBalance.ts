"use server";

export const fetchBalance = async (address: string) => {
  try {
    const res = await fetch(
      `${process.env.MEMPOOL_API_URL}/address/${address}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch balance");
    }
    const data = await res.json();
    const balance =
      (data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum) /
        100000000 || 0;

    return balance;
  } catch (error) {
    console.error((error as Error).message);
  }
};
