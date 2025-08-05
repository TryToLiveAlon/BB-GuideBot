/*CMD
  command: /adminPanel
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: /pannel
  group: 
CMD*/

let adminId = Bot.getProperty("admin");
if (user.telegramid !== adminId) {
  Bot.sendMessage("⛔ You are not authorized to access the admin panel.");
  return;
}

let quizID = Bot.getProperty("quiz_ID") || "2PACX-1vRN45jXZVX6JSlGgy9ql21wpnVGT5pnIWpSMjX0fhF8uRtbKuJIovaCBKm8Y29w4lUPGvh7QN3NoMpd";
let versionID = Bot.getProperty("version_ID") || "2PACX-1vSV4wjczHHduVgsbDY8wFTfIV7Qb0kk8pkQ69W1T1kIf6v1HTO7FUADShXrDFmUh9rw3_v3YA0lh-cU";
let lessonID = Bot.getProperty("lesson_ID") || "2PACX-1vSmaKqhLNlgXZ98D-GfQW8Ou-aRPRVcPuFKzvsUxyEroRtx7CmCBXh2cKrOAok46c7qhBlwzcBNVEqU";

let quizUrl = `https://docs.google.com/spreadsheets/d/e/${quizID}/pubhtml`
let lessonUrl = `https://docs.google.com/spreadsheets/d/e/${lessonID}/pubhtml`
let versionUrl = `https://docs.google.com/spreadsheets/d/e/${versionID}/pubhtml`

let text = "<b>🛠️ Admin Panel</b>\n\n";
text += "📚 <b>Quiz URL:</b>\n<blockquote>" + quizUrl + "</blockquote>\n";
text += "🧩 <b>Lesson URL:</b>\n<blockquote>" + lessonUrl + "</blockquote>\n";
text += "📦 <b>Version URL:</b>\n<blockquote>" + versionUrl + "</blockquote>\n\n";
text += "<b>/setup</b> This will load manually the lesson from the URL\n";
text += "<b>/setup1</b> This will load manually the quiz from the URL\n";
text += "<b>/setup2</b> This will load manually the meta from the URL\n\n";
text += "Choose what you want to update:";
Api.sendMessage({
  chat_id: user.telegramid,
  text: text,
  disable_web_page_preview:true,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "📚 Set Quiz URL", callback_data: "/saveQuizUrl" }],
      [{ text: "🧩 Set Lesson URL", callback_data: "/setLessonUrl" }],
      [{ text: "📦 Set Version URL", callback_data: "/setVersionUrl" }]
    ]
  }
});

