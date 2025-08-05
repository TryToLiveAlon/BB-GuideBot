/*CMD
  command: 👤 Profile
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let webUrl = WebApp.getUrl({
  command: "visitProfile",
  options: {
    ID: user.telegramid,
    currentLesson: User.getProperty("currentLesson") || "L1",
    currentStep: User.getProperty("currentStep") || 0
  }
});

Api.sendPhoto({
  chat_id: user.telegramid,
  photo: "https://8upload.com/image/6886228675629/4fe531ba84cee14ecf304aa99d7cdd63.png",
  caption: `🌟 *Visit Your Profile!*

🧑‍🎓 *User:* [${user.first_name}](tg://user?id=${user.telegramid})
📚 *Current Lesson:* ${User.getProperty("currentLesson") || "L1"}
📈 *Progress:* Step ${User.getProperty("currentStep") || 0}
🚀 *Level Progress:* Advancing steadily! 🎯

👇 Tap below to view your celebration!`,
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🎈 View Your Profile", web_app: { url: webUrl } }]
    ]
  }
});

