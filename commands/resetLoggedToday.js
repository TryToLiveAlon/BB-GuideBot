/*CMD
  command: resetLoggedToday
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /resetLoggedToday

let userId = options.telegramId;

User.setProperty("loggedToday", false, "boolean");
User.setProperty("canResetLogged", true, "boolean");

