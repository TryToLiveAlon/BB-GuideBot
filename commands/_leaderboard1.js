/*CMD
  command: /leaderboard1
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /updateLeaderboard

let id = options.ID;
let scoreKey = "score_" + id;
let levelKey = "level_" + id;
let streakKey = "streak_" + id;

let score = parseInt(Bot.getProperty(scoreKey)) || 0;
let level = parseInt(Bot.getProperty(levelKey)) || 0; // Default to 1 if not set
let streak = parseInt(Bot.getProperty(streakKey)) || 0;

let totalXP = ((level) * 100) + score;

// Skip users with no actual progress
if (totalXP <= 0) return;

let leaderboard = Bot.getProperty("top_leaderboard") || [];

// Remove old record if exists
leaderboard = leaderboard.filter(u => u.id !== id);

// Add updated user
leaderboard.push({
  id: id,
  name: user.first_name || "User",
  username: user.username || "unknown",
  level: level,
  score: score,
  streak: streak,
  totalXP: totalXP
});

// Sort by totalXP descending
leaderboard.sort((a, b) => b.totalXP - a.totalXP);

// Save leaderboard
Bot.setProperty("top_leaderboard", leaderboard, "json");
