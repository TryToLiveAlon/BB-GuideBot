/*CMD
  command: dailystreak.html
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Streak Tracker</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

    :root {
      --bg-dark: #121212;
      --container-dark: #1E1E1E;
      --accent-orange: #FF6B00;
      --accent-red: #FF3A30;
      --text-primary: #FFFFFF;
      --text-secondary: #A5A5A5;
      --border-orange: rgba(255, 107, 0, 0.3);
    }

    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background-color: var(--bg-dark);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      color: var(--text-primary);
    }

    .container {
      background-color: var(--container-dark);
      border-radius: 24px;
      padding: 32px;
      width: 100%;
      max-width: 320px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
      text-align: center;
      border: 1px solid var(--border-orange);
      position: relative;
      overflow: hidden;
    }

    .container::after {
      content: "";
      position: absolute;
      top: -50px;
      left: -50px;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(255, 107, 0, 0.15) 0%, transparent 70%);
      z-index: 0;
    }

    .user-profile {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
    }

    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--accent-orange);
      margin-right: 12px;
    }

    .user-name {
      font-weight: 600;
      text-align: left;
    }

    .user-status {
      font-size: 12px;
      color: var(--text-secondary);
      text-align: left;
    }

    .flame-animation {
      width: 80px;
      height: 80px;
      margin: 0 auto 8px;
      position: relative;
      z-index: 1;
    }

    .streak-display {
      position: relative;
      z-index: 1;
      margin: 24px 0;
    }

    .streak-number {
      font-size: 64px;
      font-weight: 700;
      background: linear-gradient(135deg, #FF6B00 0%, #FF3A30 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
      line-height: 1;
    }

    .streak-label {
      font-size: 16px;
      color: var(--text-secondary);
      margin-top: 8px;
    }

    .time-info {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 16px 0;
      position: relative;
      z-index: 1;
    }

    .time-info span {
      color: var(--accent-orange);
      font-weight: 600;
    }

    .motivation {
      font-size: 18px;
      font-weight: 600;
      margin-top: 24px;
      position: relative;
      z-index: 1;
      color: var(--accent-orange);
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- User Profile Section -->
    <div class="user-profile">
      <img id="userAvatar" src="https://i.imgur.com/JqYeXZn.jpg" alt="User" class="user-avatar">
      <div>
        <div id="userName" class="user-name">Loading...</div>
        <div class="user-status">On a streak!</div>
      </div>
    </div>

    <!-- Flame Animation -->
    <div class="flame-animation">
      <lottie-player 
        src="https://raw.githubusercontent.com/TryToLiveAlon/Resource/main/AnimatedEmojies.json" 
        background="transparent" 
        speed="1" 
        loop 
        autoplay>
      </lottie-player>
    </div>

    <!-- Streak Display -->
    <div class="streak-display">
      <div id="streakNumber" class="streak-number">0</div>
      <div class="streak-label">day streak</div>
    </div>

    <!-- Time Information -->
    <div class="time-info">
      Last logged in: <span id="lastLoginTime">Never</span><br>
      Current time: <span id="currentTime"></span>
    </div>

    <!-- Motivation Message -->
    <div class="motivation" id="motivationMsg">
      Keep it up! 🔥
    </div>
  </div>

  <script>
  const tg = window.Telegram.WebApp;
  tg.expand();

  const user = tg.initDataUnsafe?.user || {};
  const userId = user.id;

  // Set user name and avatar
  document.getElementById("userName").textContent =
    [user.first_name, user.last_name].filter(Boolean).join(" ") || "Anonymous";

  if (user.photo_url) {
    document.getElementById("userAvatar").src = user.photo_url;
  }

  // Get webhook URL from render
  const webhook = "<% options.webhook %>";
  const streak = <% options.Streak %> || 0;

  // Load last login from localStorage
  const lastLoginStr = localStorage.getItem("lastLoginTime");
  const lastLogin = lastLoginStr ? new Date(parseInt(lastLoginStr)) : null;
  const now = new Date();

  // Helper functions
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function formatDate(date) {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  // Display logic
  if (!lastLogin) {
    document.getElementById("lastLoginTime").textContent = "Never";
  } else {
    document.getElementById("lastLoginTime").textContent = `${formatDate(lastLogin)} at ${formatTime(lastLogin)}`;

    // Check if more than 24h passed
    const diffHours = (now - lastLogin) / (1000 * 60 * 60);
    if (diffHours >= 24) {
      // Send request to webhook with user ID
      fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ID: userId })
      }).then(res => console.log("Webhook triggered:", res.status));
    }
  }

  // Always update lastLoginTime
  localStorage.setItem("lastLoginTime", now.getTime());

  // Update UI
  document.getElementById("streakNumber").textContent = streak;
  document.getElementById("currentTime").textContent = `${formatDate(now)} at ${formatTime(now)}`;

  const motivation = document.getElementById("motivationMsg");
  motivation.textContent = "Keep it up! 🔥";
  motivation.style.color = "var(--accent-orange)";
</script>

</body>
</html>

