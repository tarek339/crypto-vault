const telegramBotApi = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

export const sendTelegramNotification = async (message: string) => {
  const url = `https://api.telegram.org/bot${telegramBotApi}/sendMessage`;
  try {
    await fetch(url ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });
  } catch (error) {
    console.error(
      "Failed to send Telegram notification:",
      (error as Error).message,
    );
  }
};
