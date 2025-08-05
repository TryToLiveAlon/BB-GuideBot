/*CMD
  command: /prev
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /prev

let step = User.getProperty("currentStep") || 0;
if (step > 0) {
  User.setProperty("currentStep", step - 1, "integer");
}
Bot.runCommand("/showStep");

