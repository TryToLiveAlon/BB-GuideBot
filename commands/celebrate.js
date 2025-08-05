/*CMD
  command: celebrate
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: celebrate

let userId = options.ID;

let scoreKey = "score_" + userId;
let streakKey = "streak_" + userId;
let levelKey = "level_" + userId;

let score = parseInt(Bot.getProperty(scoreKey)) || 0;
let streak = parseInt(Bot.getProperty(streakKey)) || 0;
let level = parseInt(Bot.getProperty(levelKey)) || 0;

let gainedXP = parseInt(options.gainedXP) || 0;
let previousScore = parseInt(options.previousScore) || 0;
let previousLevel = parseInt(options.previousLevel) || level;

let levelUp = options.levelup;

// Save updates
Bot.setProperty(scoreKey, score, "integer");
Bot.setProperty(levelKey, level, "integer");
let newPoints = 1;
if (streak === 2) {
  newPoints = 2;
} else if (streak === 3) {
  newPoints = 3;
} else if (streak > 3) {
  newPoints = 5;
}
// Lesson and progress info
let lessonId = options.lessonId;
let currentStep = parseInt(options.quizStep) || 0;
let lessons = Bot.getProperty("lessons") || [];
let lesson = lessons.find(l => l.id === lessonId);
let totalSteps = lesson?.steps?.length || 1;
let progress = Math.floor((currentStep / totalSteps) * 100);

// Render based on level up
if (levelUp) {
  WebApp.render({
    template: "levelup.html",
    options: {
      ID: userId,
      newLevel: level,
      streak: streak,
      previousLevel: level - 1,
      newPoints: newPoints,
      lessonTitle: lesson?.title || "Unknown Lesson",
      gainedXP: gainedXP
    }
  });
} else {
  WebApp.render({
    template: "celebrate.html",
    options: {
      ID: userId,
      score: score,
      streak: streak,
      lessonTitle: lesson?.title || "Unknown Lesson",
      progress: progress,
      upcomingLevel: level + 1,
      level: level,
      gainedXP: gainedXP,
newPoints: newPoints
    }
  });
}

