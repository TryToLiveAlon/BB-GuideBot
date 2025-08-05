/*CMD
  command: /test1
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let userLang = Bot.getProperty("lang_" + user.telegramid) || "hi";
let text = "Hello, how are you?";

HTTP.get({
  url: "https://lingva.ml/api/v1/auto/" + userLang + "/" + encodeURIComponent(text),
  success: function (res) {
    let data = JSON.parse(res.body || "{}");

    if (data.translation) {
      Bot.sendMessage("Translated: " + data.translation);
    } else {
      Bot.sendMessage("⚠️ No translation found:\n" + res.body);
    }
  },
  error: function (e) {
    Bot.sendMessage("❌ HTTP error:\n" + JSON.stringify(e));
  }
});

