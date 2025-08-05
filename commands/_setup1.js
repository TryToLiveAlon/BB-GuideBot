/*CMD
  command: /setup1
  help: 
  need_reply: 
  auto_retry_time: 86400
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let adminId = Bot.getProperty("admin");

if (user.telegramid != adminId) {
  Bot.sendMessage("⛔ You are not authorized to use this command.");
  return;
}
let quizID = Bot.getProperty("quiz_ID")

HTTP.get({
  url: `https://docs.google.com/spreadsheets/d/e/${quizID}/pub?output=csv`,
  success: "/onQuizzesLoaded",
  error: "/onError",
  folow_redirects: true

});
