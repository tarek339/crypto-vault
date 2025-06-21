export const checkBcApi = async () => {
  try {
    setInterval(async () => {
      const res = await fetch(
        `${process.env.SOCHAIN_API_URL}balance/${process.env.SOCHAIN_NETWORK}/${process.env.TEST_ADDRESS}`,
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
        // await sendTelegramNotification(
        //   `Blockchain API error: ${data.data.error_message}`,
        // );
      }
    }, 60 * 1000);
  } catch (error) {
    console.log("Error checking Blockchain API:", (error as Error).message);
    // await sendTelegramNotification(
    //   `Blockchain API error: ${(error as Error).message}`,
    // );
  }
};
