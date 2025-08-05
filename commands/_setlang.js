/*CMD
  command: /setlang
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

Api.sendMessage({
  text:
`🌐 <b>Language Selection Required!</b>

To enhance your experience, please send your <b>language code</b> based on the ISO 639 standard.

📝 <b>What to do?</b>
Just send your language code like:
<code>en</code> for English  
<code>hi</code> for Hindi  
<code>es</code> for Spanish  
<code>fr</code> for French  
...and so on.

❓ <b>Don't know your code?</b>
Find it here: <a href="https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes">ISO Language Codes</a>

📌 <b>Example:</b>
<code>en</code> — English  
<code>ml</code> — Malayalam  
<code>ar</code> — Arabic  
<code>ta</code> — Tamil

🔐 This helps us deliver content in your preferred language.

<b>Thanks for your cooperation!</b> 💖`,
  parse_mode: "HTML",
  disable_web_page_preview: true
});
Bot.runCommand("/setlang1")
