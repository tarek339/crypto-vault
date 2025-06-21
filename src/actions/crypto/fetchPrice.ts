"use server";

export const fetchPrice = async () => {
  try {
    const unixTimestamp = Math.floor(Date.now() / 1000);
    const res = await fetch(
      `${process.env.SOCHAIN_API_URL}v3/price/${process.env.SOCHAIN_NETWORK}/${unixTimestamp}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "API-KEY": process.env.SOCHAIN_API_KEY ?? "",
        },
      },
    );

    const data = await res.json();
    if (data.status === "fail") {
      throw new Error(data.data.error_message);
    }

    return data;
  } catch (error) {
    console.error((error as Error).message);
  }
};
