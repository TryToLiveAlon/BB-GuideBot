/*CMD
  command: /saveQuizUrl
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 📚 Please send the new Quiz spreadsheet link
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /setLessonLink

let adminId = Bot.getProperty("admin");

if (user.telegramid !== adminId) {
  Bot.sendMessage("⛔ Not authorized.");
  return;
}

// Extract ID from full URL
let regex = /\/d\/e\/([a-zA-Z0-9\-_]+)/;
let match = message.match(regex);

if (!match || !match[1]) {
  Bot.sendMessage("⚠️ Invalid Google Sheets URL.");
  return;
}

let sheetId = match[1];

// Save the extracted ID
Bot.setProperty("quiz_ID", sheetId, "string");

Api.sendMessage({
  chat_id: user.telegramid,
  text: "✅ Quiz ID updated to:\n<blockquote>" + sheetId + "</blockquote>",
  parse_mode: "HTML"
});

