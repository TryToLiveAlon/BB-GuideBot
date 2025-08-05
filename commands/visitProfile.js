/*CMD
  command: visitProfile
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /visitProfile

let userId = options.ID;
let scoreKey = "score_" + userId;
let streakKey = "streak_" + userId;
let levelKey = "level_" + userId;

let score = parseInt(Bot.getProperty(scoreKey)) || 0;
let streak = parseInt(Bot.getProperty(streakKey)) || 0;
let level = parseInt(Bot.getProperty(levelKey)) || 0;

let currentLessonId = options.currentLesson || "L1";
let currentStep = parseInt(options.currentStep || 0);
let lessons = Bot.getProperty("lessons") || [];
let lesson = lessons.find(l => l.id === currentLessonId);
let totalSteps = lesson?.steps?.length || 1;

let progress = Math.floor((currentStep / totalSteps) * 100);
let newPoints = 0;

// Calculate current points from streak for visual
if (streak === 2) {
  newPoints = 2;
} else if (streak === 3) {
  newPoints = 3;
} else if (streak > 3) {
  newPoints = 5;
} else {
  newPoints = 1;
}

// Render the celebrate.html WebApp with profile info
WebApp.render({
  template: "profile.html",
  options: {
    ID: userId,
    score: score,
    streak: streak,
    lessonTitle: lesson?.title || "Unknown Lesson",
    progress: progress,
    upcomingLevel : level + 1,
    level: level,
    newPoints: newPoints
  }
});

