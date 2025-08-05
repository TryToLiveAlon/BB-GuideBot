/*CMD
  command: /renderStep
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let msg = User.getProperty("translatedMessage");
let photo = User.getProperty("currentPhoto");
let replyMarkup = User.getProperty("currentReplyMarkup");

if (photo) {
  Api.sendPhoto({
    photo: photo,
    caption: msg,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: replyMarkup
  });
} else {
  Api.sendMessage({
    text: msg,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: replyMarkup
  });
}

