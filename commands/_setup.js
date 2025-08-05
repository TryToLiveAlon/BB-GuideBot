/*CMD
  command: /setup
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
let lessonID = Bot.getProperty("lesson_ID")

HTTP.get({
  url: `https://docs.google.com/spreadsheets/d/e/${lessonID}/pub?output=csv`,
  success: "/onLessonsLoaded",
  error: "/onError",
  folow_redirects: true

});
