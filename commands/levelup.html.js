/*CMD
  command: levelup.html
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Level Up Celebration</title>
    <style>
        @keyframes confetti {
            0% { transform: translateY(0) rotate(0); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            opacity: 0;
            animation: confetti 3s ease-out forwards;
        }
        
        .pulsing {
            animation: pulse 1.5s ease-in-out infinite;
        }
        
        .progress-container {
            width: 100%;
            height: 16px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            overflow: hidden;
            margin: 20px 0;
        }
        
        .progress-bar {
            height: 100%;
            border-radius: 8px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            width: 0%;
            transition: width 0.1s linear;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        .level-badge {
            position: absolute;
            bottom: -8px;
            right: -8px;
            background: #3b82f6;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            border: 2px solid #1e293b;
        }
    </style>
</head>
<body class="bg-gray-900 text-white font-sans min-h-screen flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md mx-auto">
        <!-- User Profile -->
        <div class="text-center mb-8">
            <div class="relative inline-block">
                <img id="userImage" src="https://i.imgur.com/JqYeXZn.jpg" 
                     class="w-20 h-20 rounded-full border-4 border-purple-500 object-cover mx-auto">
                <div id="levelBadge" class="level-badge"><% options.previousLevel %></div>
            </div>
            <div id="userName" class="font-bold text-xl mt-2">Dev User</div>
            <div id="xpDisplay" class="text-gray-300">0 / 100 XP</div>
        </div>
        
        <!-- Progress Bar -->
        <div class="progress-container">
            <div id="progressBar" class="progress-bar"></div>
        </div>
        
        <!-- Level Indicators -->
        <div class="flex justify-between text-sm mt-2 mb-8">
            <span>Level <span id="currentLevel">1</span></span>
            <span>Level <span id="nextLevel">2</span></span>
        </div>
        
        <!-- Celebration Message -->
        <div id="celebrationMessage" class="text-center my-8 opacity-0 transition-all duration-500 transform translate-y-5">
            <div class="text-4xl font-bold text-purple-400 mb-2">Level Up!</div>
            <div class="text-xl">You reached Level <span id="newLevelDisplay">2</span></div>
        </div>
        
        <!-- Stats Cards -->
        <div id="statsContainer" class="grid grid-cols-2 gap-4 mb-8 opacity-0 transition-opacity duration-500">
            <div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div class="text-sm text-gray-300">Current Streak</div>
                <div class="text-2xl font-bold flex items-center">
                    <span id="streakDays">7</span>
                    <span class="text-yellow-400 ml-1"></span>
                </div>
            </div>
            <div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div class="text-sm text-gray-300">Next Question</div>
                <div class="text-2xl font-bold"><span id="nextPoints">+5</span> XP</div>
            </div>
        </div>
        
        <!-- Continue Button -->
        <button id="continueBtn" 
                class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition opacity-0">
            Continue Learning
        </button>
    </div>

    <script>
        // Configuration - Each level requires 100 XP
        const tg = window.Telegram.WebApp;
        tg.expand();
        const user = tg.initDataUnsafe.user || {};
        const config = {
            user: {
                name: user.first_name,
                image: user.photo_url,
                currentLevel: <% options.newLevel %>,
                previousLevel: <% options.previousLevel %>,
                currentXP: 100, // Current XP (100/100)
                xpForLevel: 100 // XP needed per level
            },
            stats: {
                streak: <% options.streak %>,
                nextQuestionPoints: <% options.newPoints %>
            },
            animationDuration: 3000 // 3 seconds
        };

        // DOM Elements
        const elements = {
            userImage: document.getElementById('userImage'),
            userName: document.getElementById('userName'),
            xpDisplay: document.getElementById('xpDisplay'),
            levelBadge: document.getElementById('levelBadge'),
            progressBar: document.getElementById('progressBar'),
            currentLevel: document.getElementById('currentLevel'),
            nextLevel: document.getElementById('nextLevel'),
            newLevelDisplay: document.getElementById('newLevelDisplay'),
            celebrationMessage: document.getElementById('celebrationMessage'),
            statsContainer: document.getElementById('statsContainer'),
            streakDays: document.getElementById('streakDays'),
            nextPoints: document.getElementById('nextPoints'),
            continueBtn: document.getElementById('continueBtn')
        };

        // Create confetti effect
        function createConfetti() {
            const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50'];
            
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                
                confetti.style.width = `${Math.random() * 8 + 4}px`;
                confetti.style.height = `${Math.random() * 8 + 4}px`;
                
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }
                
                document.body.appendChild(confetti);
            }
        }

        // Animate progress from 0 to current XP
        function animateProgress() {
            const startTime = Date.now();
            const endTime = startTime + config.animationDuration;
            const xpNeeded = config.user.xpForLevel;
            const targetXP = config.user.currentXP;
            
            function update() {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / config.animationDuration, 1);
                const currentXP = Math.floor(progress * targetXP);
                const percentage = (currentXP / xpNeeded) * 100;
                
                // Update progress bar
                elements.progressBar.style.width = `${percentage}%`;
                
                // Update XP display
                elements.xpDisplay.textContent = `${currentXP} / ${xpNeeded} XP`;
                
                if (now < endTime) {
                    requestAnimationFrame(update);
                } else {
                    onProgressComplete();
                }
            }
            
            requestAnimationFrame(update);
        }

        // When progress completes
        function onProgressComplete() {
            // Show celebration
            elements.celebrationMessage.classList.remove('opacity-0', 'translate-y-5');
            elements.celebrationMessage.classList.add('opacity-100', 'translate-y-0');
            
            // Update level badge with animation
            elements.levelBadge.textContent = config.user.currentLevel;
            elements.levelBadge.classList.add('pulsing');
            
            // Create confetti
            createConfetti();
            
            // Show stats after delay
            setTimeout(() => {
                elements.statsContainer.classList.remove('opacity-0');
                elements.statsContainer.classList.add('opacity-100');
                
                // Show continue button
                setTimeout(() => {
                    elements.continueBtn.classList.remove('opacity-0');
                    elements.continueBtn.classList.add('opacity-100');
                }, 300);
            }, 500);
        }

        // Initialize the page
        function init() {
            // Set user data
            elements.userImage.src = config.user.image;
            elements.userName.textContent = config.user.name;
            elements.currentLevel.textContent = config.user.previousLevel;
            elements.nextLevel.textContent = config.user.currentLevel;
            elements.newLevelDisplay.textContent = config.user.currentLevel;
            elements.streakDays.textContent = config.stats.streak;
            elements.nextPoints.textContent = `+${config.stats.nextQuestionPoints}`;
            
            // Start animation
            setTimeout(animateProgress, 500);
            
            // Continue button action
            elements.continueBtn.addEventListener('click', () => {
                if (window.Telegram && Telegram.WebApp) {
                    Telegram.WebApp.close();
                } else {
                    alert('Continue learning!');
                }
            });
        }

        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
