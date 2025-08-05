/*CMD
  command: /showStep
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let lessons = Bot.getProperty("lessons");
let quizzes = Bot.getProperty("quizzes");

let lessonId = User.getProperty("currentLesson");
let stepIndex = parseInt(User.getProperty("currentStep") || 0);
let justAnswered = User.getProperty("justAnswered");

let userId = user.telegramid;

// === ⏰ Global Streak Check & Reset ===
let streakKey = "streak_" + userId;
let lastLoginKey = "lastLogin_" + userId;

let currentLogin = new Date().getTime();
let lastLogin = parseInt(Bot.getProperty(lastLoginKey)) || 0;
let currentStreak = parseInt(Bot.getProperty(streakKey)) || 0;

if (lastLogin) {
  let gapInHours = (currentLogin - lastLogin) / (1000 * 60 * 60);
  if (gapInHours > 24) {
    currentStreak = 0;
    Bot.setProperty(streakKey, 0, "integer");
    Bot.sendMessage("Oops! you missed a dat streak set to 0.No worries restart abd promise to maintain this streak.")
  }
}

// Update login time
Bot.setProperty(lastLoginKey, currentLogin, "integer");

// === 📚 Lesson Lookup ===
let lesson = lessons.find(l => l.id === lessonId);
if (!lesson) {
  Bot.sendMessage("⚠️ Lesson not found.");
  return;
}

if (justAnswered) {
  User.setProperty("justAnswered", false, "boolean");
} else {
  if (quizzes && quizzes[lessonId] && quizzes[lessonId][stepIndex]) {
    User.setProperty("quizStep", stepIndex, typeof stepIndex === "number" ? "integer" : "string");
    Bot.runCommand("/askQuiz");
    return;
  }
}

// === 📚 Step Rendering ===
let step = lesson.steps[stepIndex];
if (!step) {
  if (!justAnswered && quizzes && quizzes[lessonId] && quizzes[lessonId]["end"]) {
    User.setProperty("quizStep", "end", "string");
    Bot.runCommand("/askQuiz");
    return;
  }

  let lessonIndex = lessons.findIndex(l => l.id === lessonId);
  let nextLesson = lessons[lessonIndex + 1];

  if (nextLesson) {
    User.setProperty("currentLesson", nextLesson.id, "string");
    User.setProperty("currentStep", 0, "integer");

    // ✅ Optional: Increment streak on lesson completion
    currentStreak += 1;
    Bot.setProperty(streakKey, currentStreak, "integer");

    Api.sendPhoto({
      photo: "https://8upload.com/image/6883a10d0e794/61799e07b35c956bd9637aa138abc46b.png",
      caption: "✅ Moving to next lesson: <blockquote>" + nextLesson.title + "</blockquote>",
      parse_mode: "HTML"
    });

    Bot.runCommand("/showStep");
  } else {
    Api.sendPhoto({
      chat_id: userId,
      photo: "https://8upload.com/image/688470907159d/bba42b55c56489f466b4509976487315.png",
      caption: "🎉 <b>Congratulations!</b>\n\nYou have successfully completed the bot course. Now you can build your own bots! 🚀\n\nShare the bot with others to help them too.\n\nThank you! 🙏",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{
            text: "Share 🖇️",
            url: `https://t.me/share/url?url=https://t.me/${bot.name}&text=Hey%20friend!%20👋%20I%20just%20completed%20an%20awesome%20bot%20course%20from%20this%20Telegram%20bot!%20🤖🚀%20You%20should%20definitely%20check%20it%20out.%20Start%20the%20bot%20here%20👉%20@${bot.name}`
          }]
        ]
      }
    });
  }
  return;
}

// === 🖼️ Step Message ===
let totalSteps = lesson.steps.length;
let stepNumber = stepIndex + 1;

let message = "📘 <b>Lesson: " + lesson.title + "</b>\n";
message += "🔢 <b>Step " + stepNumber + " of " + totalSteps + "</b>\n\n";

if (step.title) {
  message += "📌 <b>" + step.title + "</b>\n\n";
}

message += "🧭 <b>Instructions:</b>\n" + (step.text || "…") + "\n\n";

// 📎 Resources Section
if (step.help || step.youtube || step.doc_url || step.video_url) {
  message += "📎 <b>Resources:</b>\n";

  let links = [];
  if (step.doc_url) links.push('<a href="' + step.doc_url + '">Document</a>');
  if (step.video_url) links.push('<a href="' + step.video_url + '">YouTube</a>');

  message += links.join(" | ") + "\n\n";
}

message += "🚀 Tap ➡️ Next to continue.";

// === 🔘 Buttons ===
function buildButtons(extra) {
  let buttons = [];

  if (Array.isArray(extra)) {
    buttons = extra.map(btn => {
      let obj = { text: btn.text };
      if (btn.command) obj.callback_data = btn.command;
      else if (btn.callback_data) obj.callback_data = btn.callback_data;
      else if (btn.url) obj.url = btn.url;
      return [obj];
    });
  }

  let navRow = [
    { text: "⬅️ Back", callback_data: "/prev" },
    { text: "➡️ Next", callback_data: "/next" }
  ];

  buttons.push(navRow);
  return { inline_keyboard: buttons };
}

let replyMarkup = buildButtons(step.extra);

// === 📤 Send Lesson Step ===
if (step.photo) {
  Api.sendPhoto({
    photo: step.photo,
    caption: message,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: replyMarkup
  });
} else {
  Api.sendMessage({
    text: message,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: replyMarkup
  });
}

