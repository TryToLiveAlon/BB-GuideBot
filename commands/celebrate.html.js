/*CMD
  command: celebrate.html
  help: 
  need_reply: false
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
    <title>Level Up Dashboard</title>
    <style>
        @keyframes progressAnimation {
            from { width: var(--initial-percent); }
            to { width: var(--final-percent); }
        }
        
        .progress-bar {
            --initial-percent: 0%;
            --final-percent: 0%;
            animation: progressAnimation 2s ease-out forwards;
        }

        @keyframes lessonProgressAnimation {
            from { width: 0%; }
            to { width: var(--lesson-progress); }
        }

        .lesson-progress-bar {
            --lesson-progress: 0%;
            animation: lessonProgressAnimation 1.5s ease-out forwards;
        }
        
        @keyframes confetti {
            0% { transform: translateY(0) rotate(0); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            opacity: 0;
            animation: confetti 3s ease-out forwards;
        }
        
        @keyframes levelUp {
            0% { transform: scale(1); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .level-up-text {
            animation: levelUp 1.5s ease-out;
        }
        
        .stats-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body class="bg-gray-900 text-white font-sans overflow-hidden">
    <div class="relative min-h-screen pb-20">
        <!-- User Profile Header -->
        <div class="flex items-center p-6">
            <div class="relative">
                <img id="userImage" src="https://i.imgur.com/JqYeXZn.jpg" 
                     class="w-16 h-16 rounded-full border-2 border-purple-500 shadow-lg object-cover">
                <div class="absolute -bottom-1 -right-1 bg-blue-500 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    <span id="userLevel"><% options.level %></span>
                </div>
            </div>
            <div class="ml-4">
                <div id="userName" class="font-bold text-xl">Hi, <% options.username %></div>
                <div class="text-sm text-gray-300">Level <span id="currentLevel"><% options.level %></span> Learner</div>
            </div>
        </div>
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-2 gap-4 px-6 mb-8">
            <div class="stats-card rounded-xl p-4 border border-gray-700">
                <div class="text-sm text-gray-300">Current Streak</div>
                <div class="text-2xl font-bold flex items-center">
                    <span id="streakDays"><% options.streak %></span>
                    <span class="text-yellow-400 ml-1"></span>
                </div>
            </div>
            <div class="stats-card rounded-xl p-4 border border-gray-700">
                <div class="text-sm text-gray-300">Next Question</div>
                <div class="text-2xl font-bold"><span id="nextPoints">+<% options.newPoints %></span> XP</div>
            </div>
        </div>
        
        <!-- Current Lesson -->
        <div class="stats-card mx-6 mb-8 rounded-xl p-4 border border-gray-700">
            <div class="text-sm text-gray-300">Current Lesson</div>
            <div class="text-lg font-bold truncate" id="currentLesson"><% options.lessonTitle %></div>
            <div class="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div id="lessonProgressBar" class="lesson-progress-bar bg-blue-400 h-2 rounded-full"></div>
            </div>
            <div class="text-xs text-right text-gray-400 mt-1"><span id="lessonProgressText"><% options.progress %></span>% completed</div>
        </div>
        
        <!-- XP Progress Bar -->
        <div class="mx-6 mb-8">
            <div class="flex justify-between mb-2">
                <span class="text-sm">Experience Points</span>
                <span class="text-sm font-medium" id="progressText"><% options.score %>/<% options.maxXP %> XP</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-4">
                <div id="progressBar" class="progress-bar bg-gradient-to-r from-blue-400 to-purple-500 h-4 rounded-full"></div>
            </div>
            <div class="flex justify-between mt-1">
                <span class="text-xs text-gray-400">Level <% options.level %></span>
                <span class="text-xs text-gray-400">Level <% options.upcomingLevel %></span>
            </div>
        </div>
        
        <!-- Level Up Content -->
        <div class="flex flex-col items-center px-6">
            <div class="text-center mb-6">
                <div class="text-4xl font-bold mb-2 level-up-text">Level Up!</div>
                <div class="text-xl text-purple-300">+<% options.gainedXP %> XP Gained</div>
            </div>
            
            <div class="w-full max-w-md bg-gray-800 rounded-lg p-6 shadow-xl mb-8">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <div class="text-sm text-gray-300">Previous Level</div>
                        <div class="text-2xl font-bold"><% options.level %></div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-300">New Level</div>
                        <div class="text-2xl font-bold"><% options.upcomingLevel %></div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Continue Button -->
        <div class="fixed bottom-6 left-0 right-0 px-6">
            <button id="continueBtn" 
                    class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition opacity-0 transform translate-y-4">
                Continue Learning
            </button>
        </div>
    </div>

    <script>
        const tg = window.Telegram.WebApp;
        tg.expand();
        const user = tg.initDataUnsafe.user || {};
        
        // Configuration - These values would come from your backend
        const config = {
            user: {
                name: [user.first_name, user.last_name].filter(Boolean).join(" ") || "Guest",
                image: user.photo_url || 'https://via.placeholder.com/150',
                currentLevel: <% options.level %>,
                previousLevel: <% options.level %> + 1,
                xp: {
                    current: <% options.score %>,
                    gained: <% options.gainedXP %>,
                    max: 100
                },
                streak: <% options.streak %>,
                nextQuestionPoints: <% options.newPoints %>,
                currentLesson: {
                    title: "<% options.lessonTitle %>",
                    progress: <% options.progress %>
                }
            }
        };
        
        // DOM Elements
        const elements = {
            userImage: document.getElementById('userImage'),
            userName: document.getElementById('userName'),
            userLevel: document.getElementById('userLevel'),
            currentLevel: document.getElementById('currentLevel'),
            progressBar: document.getElementById('progressBar'),
            progressText: document.getElementById('progressText'),
            streakDays: document.getElementById('streakDays'),
            nextPoints: document.getElementById('nextPoints'),
            currentLesson: document.getElementById('currentLesson'),
            lessonProgressBar: document.getElementById('lessonProgressBar'),
            lessonProgressText: document.getElementById('lessonProgressText'),
            continueBtn: document.getElementById('continueBtn')
        };
        
        // Set initial data
        function initData() {
            // User profile
            elements.userImage.src = config.user.image;
            elements.userName.textContent = config.user.name;
            elements.userLevel.textContent = config.user.currentLevel;
            elements.currentLevel.textContent = config.user.currentLevel;
            
            // Calculate progress percentages
            const initialPercent = (config.user.xp.current / config.user.xp.max) * 100;
            const finalPercent = ((config.user.xp.current) / config.user.xp.max) * 100;
            
            // Set progress bar animation properties
            elements.progressBar.style.setProperty('--initial-percent', `${initialPercent}%`);
            elements.progressBar.style.setProperty('--final-percent', `${finalPercent}%`);
            
            // Set progress text
            elements.progressText.textContent = `${config.user.xp.current}/${config.user.xp.max} XP`;
            
            // Stats
            elements.streakDays.textContent = config.user.streak;
            elements.nextPoints.textContent = `+${config.user.nextQuestionPoints}`;
            elements.currentLesson.textContent = config.user.currentLesson.title;
            
            // Lesson Progress
            elements.lessonProgressBar.style.setProperty('--lesson-progress', `${config.user.currentLesson.progress}%`);
            elements.lessonProgressText.textContent = config.user.currentLesson.progress;
        }
        
        // Create confetti effect
        function createConfetti() {
            const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50'];
            
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                
                // Random shapes and sizes
                confetti.style.width = `${Math.random() * 8 + 4}px`;
                confetti.style.height = `${Math.random() * 8 + 4}px`;
                
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }
                
                document.body.appendChild(confetti);
            }
        }
        
        // Show continue button after animation
        function showContinueButton() {
            setTimeout(() => {
                elements.continueBtn.classList.remove('opacity-0', 'translate-y-4');
                elements.continueBtn.classList.add('opacity-100', 'translate-y-0');
            }, 2500);
        }
        
        // Initialize page
        document.addEventListener('DOMContentLoaded', () => {
            initData();
            createConfetti();
            showContinueButton();
            
            // Continue button action
            elements.continueBtn.addEventListener('click', () => {
                // Close WebApp or navigate to next lesson
                tg.close();
            });
        });
    </script>
</body>
</html>
