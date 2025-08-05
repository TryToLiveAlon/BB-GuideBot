/*CMD
  command: 🏆 Leaderboard
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: /leaderboard
  group: 
CMD*/

let leaderboard = Bot.getProperty("top_leaderboard") || [];

if (leaderboard.length === 0) {
  Api.sendMessage({
    chat_id: user.telegramid,
    text: "⚠️ Leaderboard is empty.",
    parse_mode: "HTML"
  });
  return;
}

let text = "<b>🏆 Top 10 Leaderboard</b>\n\n";

leaderboard.slice(0, 10).forEach((u, i) => {
  let medal = ["🥇", "🥈", "🥉"][i] || `#${i + 1}`;
  let name = u.name || "User";
  let username = u.username ? `@${u.username}` : "unknown";
  let level = u.level || 0;
  let score = u.score || 0;
  let streak = u.streak || 0;
  let totalXP = u.totalXP || ((level - 1) * 100 + score);

  text += `${medal} <b>${name}</b> (${username})\n`;
  text += `📊 Level: ${level}, XP: ${score}, 🔥 Streak: ${streak}\n`;
  text += `⭐ Total XP: ${totalXP}\n\n`;
});

Api.sendMessage({
  chat_id: user.telegramid,
  text: text,
  parse_mode: "HTML"
});

