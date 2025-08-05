/*CMD
  command: /onVersionLoad
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/


let lines = content.trim().split("\r\n");

let values = {};
lines.forEach(line => {
  let parts = line.split(",");
  if (parts.length === 2) {
    values[parts[0]] = parts[1];
  }
});

// Now you can store them as individual user properties or use them
Bot.setProperty("version", values["version"], "string");
Bot.setProperty("template_version", values["template_version"], "string");
Bot.setProperty("lang", values["lang"], "string");
Bot.setProperty("updated_at", values["updated_at"], "string");

// Example usage:
Api.sendMessage({
  text:"<b>📄 Parsed Config:</b>\n" +
  "<blockquote>Version: " + values["version"] + "\n" +
  "Template Version: " + values["template_version"] + "\n" +
  "Language: " + values["lang"] + "\n" +
  "Last Updated: " + values["updated_at"] + "</blockquote>",
  parse_mode: "HTML"
});

