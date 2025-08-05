/*CMD
  command: /onLessonsLoaded
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /onLessonsLoaded

let admin_id = 6140468904; // 🔁 Replace with your actual Telegram user ID

if (user.telegramid !== admin_id) {
  Bot.sendMessage("⛔ Only the bot admin can import lessons.");
  return;
}

let lines = content.split('\n');
let lessons = [];
let currentLesson = null;
let errors = [];

function parseCSV(row) {
  const result = [];
  let insideQuote = false;
  let value = '';

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === '"' && nextChar === '"') {
      value += '"';
      i++;
    } else if (char === '"') {
      insideQuote = !insideQuote;
    } else if (char === ',' && !insideQuote) {
      result.push(value.trim());
      value = '';
    } else {
      value += char;
    }
  }
  result.push(value.trim());
  return result;
}

for (let i = 1; i < lines.length; i++) {
  let row = lines[i].trim();
  if (!row) continue;

  let cols = parseCSV(row);
  if (cols.length < 9) {
    errors.push("❌ Line " + (i + 1) + ": Not enough columns.");
    continue;
  }

  let [id, step, title, description, text, photo, youtube, help, extraRaw] = cols;

  // ❗ Validate text length (1024 with photo, 4096 otherwise)
  if (photo && text.length > 1024) {
    errors.push("⚠️ Line " + (i + 1) + ": Text too long for photo (limit 1024).");
  } else if (!photo && text.length > 4096) {
    errors.push("⚠️ Line " + (i + 1) + ": Text too long (limit 4096).");
  }

  // ❗ Validate URLs
  if (photo && !photo.startsWith("http")) {
    errors.push("❌ Line " + (i + 1) + ": Invalid photo URL.");
  }
  if (youtube && !youtube.startsWith("http")) {
    errors.push("❌ Line " + (i + 1) + ": Invalid YouTube link.");
  }
  if (help && !help.startsWith("http")) {
    errors.push("❌ Line " + (i + 1) + ": Invalid document link.");
  }

  // ❗ Validate JSON
  let extra = null;
  try {
    if (extraRaw && extraRaw.includes('{')) {
      extra = JSON.parse(extraRaw.replace(/""/g, '"'));
    }
  } catch (e) {
    errors.push("❌ Line " + (i + 1) + ": Invalid JSON in 'extra' field.");
  }

  // Start new lesson
  if (id) {
    currentLesson = {
      id,
      title,
      description,
      steps: []
    };
    lessons.push(currentLesson);
  }

  if (!currentLesson) {
    errors.push("❌ Line " + (i + 1) + ": No lesson context found.");
    continue;
  }

  currentLesson.steps.push({
    step,
    title,
    text,
    photo,
    video_url: youtube,
    doc_url: help,
    youtube,
    help,
    extra
  });
}

// ✅ Save if no critical errors
Bot.setProperty("lessons", lessons, "json");

let message = "✅ Lessons imported: " + lessons.length;
if (errors.length > 0) {
  message += "\n⚠️ Issues found in " + errors.length + " row(s):\n\n" + errors.slice(0, 15).join("\n");
  if (errors.length > 15) message += "\n...and " + (errors.length - 15) + " more.";
}

Bot.sendMessage(message);

