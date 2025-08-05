/*CMD
  command: profile.html
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
    <title>My Profile</title>
    <style>
        @keyframes lessonProgressAnimation {
            from { width: 0%; }
            to { width: var(--lesson-progress); }
        }

        .lesson-progress-bar {
            --lesson-progress: 65%;
            animation: lessonProgressAnimation 1.5s ease-out forwards;
        }
        
        .stats-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
        }
        
        /* Ensure content doesn't get hidden behind button */
        .content-container {
            padding-bottom: 6rem; /* Match button height + margin */
        }
    </style>
</head>
<body class="bg-gray-900 text-white font-sans">
    <div class="content-container pb-16"> <!-- Increased bottom padding -->
        <!-- User Profile Header -->
        <div class="flex items-center p-6">
            <div class="relative">
                <img id="userImage" src="https://i.imgur.com/JqYeXZn.jpg" 
                     class="w-16 h-16 rounded-full border-2 border-purple-500 shadow-lg object-cover">
                <div class="absolute -bottom-1 -right-1 bg-blue-500 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    <span id="userLevel">2</span>
                </div>
            </div>
            <div class="ml-4">
                <div id="userName" class="font-bold text-xl">Hi I'm Dev</div>
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
                <div class="text-sm text-gray-300">XP</div>
                <div class="text-2xl font-bold"><span id="totalXP"><% options.score %></span> XP</div>
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
                <span class="text-sm font-medium" id="progressText"><% options.score %>/100 XP</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-4">
                <div id="progressBar" class="bg-gradient-to-r from-blue-400 to-purple-500 h-4 rounded-full" style="width: <% options.score %>%"></div>
            </div>
            <div class="flex justify-between mt-1">
                <span class="text-xs text-gray-400">Level <% options.level %></span>
                <span class="text-xs text-gray-400">Level <% options.upcomingLevel %></span>
            </div>
        </div>
        <!-- Additional space at the bottom -->
        <div class="h-16"></div>
    </div>
    
    <!-- Fixed button positioned above content -->
    <div class="fixed bottom-6 left-0 right-0 px-6 z-10">
        <button id="backBtn" 
                class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition">
            Back to Learning
        </button>
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
                totalXP: <% options.score %>,
                xp: {
                    current: <% options.score %>,
                    max: 100
                },
                streak: <% options.streak %>,
                stats: {
                    lessonsCompleted: <% options.previousLevel %>,
                    questionsAnswered: 45,
                    correctAnswers: 38,
                    accuracyRate: "84%"
                },
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
            totalXP: document.getElementById('totalXP'),
            currentLesson: document.getElementById('currentLesson'),
            lessonProgressBar: document.getElementById('lessonProgressBar'),
            lessonProgressText: document.getElementById('lessonProgressText'),
            backBtn: document.getElementById('backBtn'),
            lessonsCompleted: document.getElementById('lessonsCompleted'),
            questionsAnswered: document.getElementById('questionsAnswered'),
            correctAnswers: document.getElementById('correctAnswers'),
            accuracyRate: document.getElementById('accuracyRate')
        };
        
        // Set initial data
        function initData() {
            // User profile
            elements.userImage.src = config.user.image;
            elements.userName.textContent = config.user.name;
            elements.userLevel.textContent = config.user.currentLevel;
            elements.currentLevel.textContent = config.user.currentLevel;
            
            // XP Progress
            elements.progressBar.style.width = `${config.user.xp.current}%`;
            elements.progressText.textContent = `${config.user.xp.current}/${config.user.xp.max} XP`;
            elements.totalXP.textContent = config.user.totalXP;
            
            // Stats
            elements.streakDays.textContent = config.user.streak;
            elements.currentLesson.textContent = config.user.currentLesson.title;
            
            // Lesson Progress
            elements.lessonProgressBar.style.setProperty('--lesson-progress', `${config.user.currentLesson.progress}%`);
            elements.lessonProgressText.textContent = config.user.currentLesson.progress;
            
            // Stats
            elements.lessonsCompleted.textContent = config.user.stats.lessonsCompleted;
            elements.questionsAnswered.textContent = config.user.stats.questionsAnswered;
            elements.correctAnswers.textContent = config.user.stats.correctAnswers;
            elements.accuracyRate.textContent = config.user.stats.accuracyRate;
        }
        
        // Initialize page
        document.addEventListener('DOMContentLoaded', () => {
            initData();
            
            // Back button action
            elements.backBtn.addEventListener('click', () => {
                // Close WebApp or navigate back
                tg.close();
            });
        });
    </script>
</body>
</html>
