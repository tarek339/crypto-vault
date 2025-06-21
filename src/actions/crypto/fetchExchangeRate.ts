export const fetchExchange = async () => {
  try {
    const res = await fetch(
      `${process.env.EXCHANGE_API_URL}${process.env.EXCHANGE_API_KEY}&symbols=eur`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch the current exchange");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error((error as Error).message);
  }
};
