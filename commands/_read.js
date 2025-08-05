/*CMD
  command: /read
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: /lessons
  group: 
CMD*/

// Command: /start
let admin_id = Bot.getProperty("admin"); // 🔁 Replace with your actual Telegram user ID

let lessons = Bot.getProperty("lessons");

if (!lessons || lessons.length === 0) {
  Api.sendMessage({
    chat_id: admin_id,
    text: "Please use the setup command firstly.",
    parse_mode: "HTML"
});
  return;
}

// Start from lesson L1, step 0
let lesson = lessons.find(l => l.id === "L1");

if (!lesson) {
  Bot.sendMessage("❌ Default lesson L1 not found.");
  return;
}

User.setProperty("currentLesson", "L1", "string");
User.setProperty("currentStep", 0, "integer");

Bot.runCommand("/showStep");

