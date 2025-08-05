/*CMD
  command: /check
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// command: /check
let now = Date.now(); // current time
let lastLogin = User.getProperty("last_login");

if (!lastLogin) {
  Bot.sendMessage("❌ No login found. Please send /login first.");
  return;
}

let diff = now - lastLogin;

if (diff <= 2000) {  // 2 seconds = 2000 milliseconds
  Bot.sendMessage("✅ You're good to go! (Logged in less than 2 seconds ago)");
} else {
  Bot.sendMessage("❌ You failed! (More than 2 seconds since login)");
}

