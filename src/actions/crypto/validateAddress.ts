"use server";

export const validateAddress = async (address: string) => {
  try {
    const res = await fetch(
      `${process.env.MEMPOOL_API_URL}v1/validate-address/${address}`,
    );

    const data = await res.json();

    return data.isvalid;
  } catch (error) {
    console.log((error as Error).message);
  }
};
