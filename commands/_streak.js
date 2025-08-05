/*CMD
  command: /streak
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /sendStreakReminder
let webAppUrl = WebApp.getUrl({
  command: "DailyStreak", // This is the WebApp-rendering command below
  options: { hrs: 6, ID: user.telegramid} // optional data you want to show on WebApp
});

Api.sendMessage({
  text: "🕒 You have 6 hours left to maintain your daily streak. Tap below to log in!",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🔥 Login to Maintain Streak",
          web_app: { url: webAppUrl }
        }
      ]
    ]
  }
});
Bot.inspect(webAppUrl)
