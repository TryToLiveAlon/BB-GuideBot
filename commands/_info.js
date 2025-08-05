/*CMD
  command: /info
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: ℹ️ bot info
  group: 
CMD*/

let version = Bot.getProperty("version") || "v1.0.0";
let botName = bot.name;

let botInfo =
"👨‍💻 <b>Bot Information</b>\n\n" +
`<blockquote>🤖 My Name: @${botName}\n` +
"👨‍🔧 Developer: <a href='https://t.me/TryToliveAlon_Backup'>@TryToliveAlon_Backup</a>\n" +
"🧠 Language: BJS\n" +
`🖥️ Server: <a href='https://app.bots.business/'>BB</a>\n` +
`📦 Build Version: ${version} [Stable]</blockquote>`;

Api.sendMessage({
  chat_id: user.telegramid,
  text: botInfo,
  disable_web_page_preview: true,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🌐 GitHub Source", url: "https://github.com/TryToLiveAlon/BB-GuideBot" }],
      [{ text: "👨‍💻 Developer", url: "https://t.me/TryToliveAlon_Backup" }]
    ]
  }
});

