/*CMD
  command: /setlang1
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let lang = message.toLowerCase();

if (lang.length != 2) {
  Bot.sendMessage("❌ Invalid ISO 639-1 language code. Please send a 2-letter code like `en`, `hi`, or `fr`.");
  return;
}

// Save language code to user's property
Bot.setProperty("lang_" + user.telegramid, lang, "string");

Bot.sendMessage("✅ Your preferred language ISO code has been set to: <code>" + lang + "</code>", { parse_mode: "HTML" });

// Notify the user about the incomplete function
Api.sendMessage({
  chat_id: user.telegramid,
  text: "⚠️ Sorry to say, but this function was not completed due to one reason. I'm not blaming the admin, but I don't have access to the OpenAI API key. That's why I couldn't build it further.",
  parse_mode: "HTML"
});

