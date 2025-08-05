/*CMD
  command: /login

  <<HELP

  HELP
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: /loginme, /loginme, /adminlogin
  group: 
CMD*/

let allowedAdmins = [6140468904, 123456789]; // ✅ Replace with your allowed Telegram user IDs
let userId = user.telegramid;

if (!allowedAdmins.includes(userId)) {
  Bot.sendMessage("⛔ You are not authorized to run this command.");
  return;
}

// ✅ Set bot-level property 'admin' to this user ID
Bot.setProperty("admin", userId, "integer");

// ✅ Set user-level property 'last_login' to current date/time
let now = new Date();
User.setProperty("last_login", now.toISOString(), "string");

// ✅ Send success message with bot name
let botName = bot.name;

Api.sendMessage({
  chat_id: userId,
  text: "✅ Successfully logged in to <b>@" + botName + "</b> as admin!",
  parse_mode: "HTML"
});

