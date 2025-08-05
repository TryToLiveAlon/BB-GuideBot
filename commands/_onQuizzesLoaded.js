/*CMD
  command: /onQuizzesLoaded
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// Command: /onQuizLoaded

function parseCSVRow(row) {
  const result = [];
  let insideQuote = false;
  let value = "";

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === '"' && nextChar === '"') {
      value += '"';
      i++; // skip next quote
    } else if (char === '"') {
      insideQuote = !insideQuote;
    } else if (char === ',' && !insideQuote) {
      result.push(value.trim());
      value = "";
    } else {
      value += char;
    }
  }

  result.push(value.trim());
  return result;
}

let data = content.split("\n").slice(1); // Skip header
let quizzes = {};
let importedCount = 0;
let badRows = [];

for (let i = 0; i < data.length; i++) {
  let raw = data[i].trim();
  if (!raw) continue;

  let [lesson_id, step, question, options, answer] = parseCSVRow(raw);

  // ✅ Validation
  if (!lesson_id || !step || !question || !options || !answer) {
    badRows.push(i + 2); // row number (accounting for skipped header)
    continue;
  }

  if (!quizzes[lesson_id]) {
    quizzes[lesson_id] = {};
  }

  quizzes[lesson_id][step] = {
    question,
    options: options.split(";").map(o => o.trim()).filter(o => o),
    answer
  };

  importedCount++;
}

Bot.setProperty("quizzes", quizzes, "json");

let message = `✅ Quiz data loaded.\n📚 Total valid quizzes: *${importedCount}*`;

if (badRows.length) {
  message += `\n⚠️ Skipped invalid rows: ${badRows.join(", ")}`;
}

Bot.sendMessage(message, { parse_mode: "Markdown" });

