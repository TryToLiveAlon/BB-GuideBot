/*CMD
  command: /setLessonUrl
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 📚 Please send the new Lesson Spreadsheet link
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /getSheetId

let adminId = Bot.getProperty("admin");
if (user.telegramid !== adminId) {
  Bot.sendMessage("⛔ Not authorized.");
  return;
}

let inputUrl = message;

if (!inputUrl) {
  Bot.sendMessage("❗ Please send a Google Sheets URL.\nExample:\nhttps://docs.google.com/spreadsheets/d/e/2PACX-XXXXX/pubhtml");
  return;
}

// Match the 2PACX ID using regular expression
let match = inputUrl.match(/\/d\/e\/(2PACX-[\w-]+)/);

if (match && match[1]) {
  let sheetId = match[1];

  // Save the extracted sheet ID
  Bot.setProperty("lesson_ID", sheetId, "string");

  Api.sendMessage({
    chat_id: user.telegramid,
    text: "✅ Lesson ID updated to:\n<blockquote>" + sheetId + "</blockquote>",
    parse_mode: "HTML"
  });

} else {
  Bot.sendMessage("⚠️ Couldn't extract Sheet ID.\nMake sure the URL is like:\nhttps://docs.google.com/spreadsheets/d/e/2PACX-.../pubhtml");
}

