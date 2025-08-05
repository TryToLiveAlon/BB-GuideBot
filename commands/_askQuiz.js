/*CMD
  command: /askQuiz
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /askQuiz

let quizzes = Bot.getProperty("quizzes");
let lessonId = User.getProperty("currentLesson");
let quizStep = User.getProperty("quizStep");

if (!quizzes || !quizzes[lessonId]) {
  Bot.sendMessage("⚠️ Quiz not found.");
  return;
}

let quiz = quizzes[lessonId][quizStep];

if (!quiz) {
  Bot.sendMessage("⚠️ Quiz not found.");
  return;
}

User.setProperty("currentQuizAnswer", quiz.answer, "string");
User.setProperty("currentQuizStep", quizStep, typeof quizStep === "string" ? "string" : "integer");

let message = "❓ *" + quiz.question + "*";
let buttons = [];

for (let opt of quiz.options) {
  buttons.push([{ text: opt, callback_data: "/quizAnswer " + opt }]);
}

Api.sendMessage({
  text: message,
  parse_mode: "Markdown",
  reply_markup: { inline_keyboard: buttons }
});

