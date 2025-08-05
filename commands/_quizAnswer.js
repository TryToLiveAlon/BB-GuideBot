/*CMD
  command: /quizAnswer
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /quizAnswer

if (request.data) {
  Api.deleteMessage({ message_id: request.message.message_id });
}

let userId = user.telegramid;
let answer = params;

let correctAnswer = User.getProperty("currentQuizAnswer");
let quizStep = User.getProperty("currentQuizStep");
let lessonId = User.getProperty("currentLesson");

let scoreKey = "score_" + userId;
let streakKey = "streak_" + userId;
let levelKey = "level_" + userId;

let currentScore = parseInt(Bot.getProperty(scoreKey)) || 0;
let currentStreak = parseInt(Bot.getProperty(streakKey)) || 0;
let currentLevel = parseInt(Bot.getProperty(levelKey)) || 1;

if (!correctAnswer || !quizStep || !lessonId) {
  Api.sendMessage({
    chat_id: userId,
    text: "⚠️ Quiz context missing. Please restart the quiz.",
    parse_mode: "Markdown"
  });
  return;
}

let awarded = 0;

if (answer === correctAnswer) {
  currentStreak += 1;

  if (currentStreak === 1) awarded = 1;
  else if (currentStreak === 2) awarded = 2;
  else if (currentStreak === 3) awarded = 3;
  else awarded = 5;

  currentScore += awarded;

  let leveledUp = false;
  if (currentScore >= 100) {
    currentScore -= 100;
    currentLevel += 1;
    leveledUp = true;
    Bot.setProperty(levelKey, currentLevel, "integer");
  }

  Bot.setProperty(scoreKey, currentScore, "integer");
  Bot.setProperty(streakKey, currentStreak, "integer");

  let msg = `✅ *Correct!* 🎉\n+${awarded} XP`;
  if (currentStreak >= 2) msg += `\n🔥 Streak: ${currentStreak}`;
  msg += `\n🏆 *Total XP:* ${currentScore}\n📊 *Level:* ${currentLevel}`;

  Api.sendMessage({
    chat_id: userId,
    text: msg,
    parse_mode: "Markdown"
  });

  User.setProperty("justAnswered", true, "boolean");

  // 🎉 Celebrate Level Up
  if (leveledUp) {
    let webUrl = WebApp.getUrl({
      command: "celebrate",
      options: {
        levelup: true,
        ID: userId,
        lessonId,
        quizStep,
        score: currentScore,
        level: currentLevel,
        previousScore: 0,
        previousLevel: currentLevel - 1,
        gainedXP: awarded,
        gainedLevels: 1,
        name: user.first_name
      }
    });

    Api.sendPhoto({
      chat_id: userId,
      photo: "https://t4.ftcdn.net/jpg/06/20/76/37/240_F_620763712_lzjIErP2KxS5vhLoTV6tlJH7QKEX1NF7.jpg",
      caption: `🥳 *You just leveled up!*\n\n🏆 *New Level:* ${currentLevel}`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🎉 View Level Up", web_app: { url: webUrl } }]
        ]
      }
    });
  }

  // 🧠 Update leaderboard
  Bot.runCommand("/leaderboard1", { ID: userId });

} else {
  currentStreak = 0;
  Bot.setProperty(streakKey, 0, "integer");
  User.setProperty("currentStep", 0, "integer");
  User.setProperty("justAnswered", false, "boolean");

  Api.sendMessage({
    chat_id: userId,
    text: `❌ *Wrong answer!*\n✅ Correct: *${correctAnswer}*\n\n🔁 Restarting lesson...`,
    parse_mode: "Markdown"
  });
}

// 🔄 Milestone Check
let webCounterKey = "webViewCounter_" + userId;
let webCounter = parseInt(Bot.getProperty(webCounterKey)) || 0;
webCounter += 1;
Bot.setProperty(webCounterKey, webCounter, "integer");

if (webCounter >= 4) {
  Bot.setProperty(webCounterKey, 0, "integer");

  let lastScore = parseInt(Bot.getProperty("lastWebScore_" + userId)) || 0;
  let lastLevel = parseInt(Bot.getProperty("lastWebLevel_" + userId)) || 1;

  let gainedXP = currentScore - lastScore;
  if (gainedXP < 0) gainedXP = (100 - lastScore) + currentScore;

  let gainedLevels = currentLevel - lastLevel;

  Bot.setProperty("lastWebScore_" + userId, currentScore, "integer");
  Bot.setProperty("lastWebLevel_" + userId, currentLevel, "integer");

  let webUrl = WebApp.getUrl({
    command: "celebrate",
    options: {
      ID: userId,
      lessonId,
      quizStep,
      score: currentScore,
      level: currentLevel,
      previousScore: lastScore,
      previousLevel: lastLevel,
      gainedXP,
      gainedLevels,
      name: user.first_name
    }
  });

  Api.sendMessage({
    chat_id: userId,
    text: `🎉 *Milestone Unlocked!*\n\n📈 *XP Gained:* ${gainedXP}\n⬆️ *Level Progress:* ${gainedLevels}`,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎈 View Celebration", web_app: { url: webUrl } }]
      ]
    }
  });
}

// ▶️ Continue
Bot.runCommand("/showStep");

