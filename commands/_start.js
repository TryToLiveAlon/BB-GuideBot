/*CMD
  command: /start
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

Api.sendPhoto({
  chat_id: user.telegramid,
  photo: "https://8upload.com/image/6885c7bd97f5d/e26a1bc8a65c4d236202556320bfc60c.png",
  caption:
    "👋 <b>Welcome to BB GuideBot Assistant!</b>\n\n" +
    "<blockquote>Your personal guide to mastering Bots.Business scripting — the language behind smart Telegram bots!</blockquote>\n\n" +
    "📚 <b>What can I help you with?</b>\n" +
    "• Learn step-by-step how to use <b>BB scripting language</b>\n" +
    "• Understand real-world examples with <b>Tutorial & Document Integration</b>\n" +
    "• Build interactive bots with your brilliant mind, docs, and this bot\n\n" +
    "🛠️ Start coding smarter bots today!\n\n" +
    "🔗 <b>Tip:</b> Use /lessons to begin.\n\n" +
    "❓ <b>Tip:</b> Use /setlang to set your learning language.\n\n" +
    "<b>This is a demo bot for the <a href='https://t.me/botsbus/2221'>BB GuideBot Contest</a></b>",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "📘 Start Lessons", callback_data: "/lessons" }]
    ]
  }
});


// Send custom reply keyboard
Api.sendMessage({
  chat_id: user.telegramid,
  text: "Choose an option from the keyboard below 👇",
  reply_markup: {
    keyboard: [
      ["👤 Profile", "🏆 Leaderboard"],
      ["ℹ️ Bot Info"]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
});

