/*CMD
  command: /onWebhook 
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let data = JSON.parse(content); // parse the raw content string

// Inspect raw content (for debug)
Bot.inspect(content);

// Send raw content to your admin
let adminId = data.ID; // replace with your real admin ID

Api.sendMessage({
  chat_id: adminId,
  text: "*New Webhook Received 📡*\n\n" + 
  "*User ID:* `" + data.ID + "`\n" + 
  "*Raw:* `" + content + "`",
  parse_mode: "Markdown"
});

// Now run for the user
Bot.run({
  command: "/userWebhookHandler",
  user_id: data.ID,
  options: { message: "hiiiiiiii" }
});

