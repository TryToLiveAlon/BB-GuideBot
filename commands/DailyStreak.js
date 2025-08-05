/*CMD
  command: DailyStreak
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/


let userId = options.ID;
let streakKey = "streak_" + userId;
let currentStreak = parseInt(Bot.getProperty(streakKey)) || 0;
let webhookUrl = Libs.Webhooks.getUrlFor({
  command: "/onWebhook" // global webhook, no user_id
});

WebApp.render({
  template: "dailystreak.html",
  options: {
    webhook: webhookUrl,
    Streak: currentStreak
  }
});

