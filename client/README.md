Project stack
- Frontend: React 19, Vite, React Router, Tailwind CSS, Recharts, Lucide icons, Framer Motion.
- Backend: Node.js, Express, Mongoose, MongoDB Atlas, JWT authentication, bcrypt password hashing.
- Browser tracking: Manifest V3 Chrome extension.
- Desktop tracking: Node-based Windows active-window tracker using get-windows.
- Storage:
  - MongoDB: users, usage records, goals.
  - Browser local storage: auth token/user, UI theme, editable profile details/photo, notification preferences, extension state.
Routes
Public:
- /
- /login
- /register
- /forgot-password
Authenticated dashboard routes:
- /dashboard — overview
- /dashboard/app-analytics
- /dashboard/behaviour
- /dashboard/ai-insights
- /dashboard/predictions
- /dashboard/reports
- /dashboard/goals
- /dashboard/settings
Data pipeline
Chrome Extension / Desktop Tracker
        ↓
POST /api/usage  (JWT-protected)
        ↓
MongoDB Usage collection
        ↓
Express analytics/controllers
        ↓
GET dashboard, analytics, insights, goals APIs
        ↓
React dashboard charts, cards, app breakdowns
Browser-extension pipeline
1. Detects the active Chrome tab.
2. Identifies richer activities on supported platforms:
   - Instagram: reels, stories, chats, explore, posts
   - YouTube: shorts, search, videos
   - LinkedIn: jobs, chats, feed
   - Spotify: music
   - Other sites: browsing
3. Saves tracking state in Chrome extension storage.
4. Uploads usage every minute to /api/usage.
5. Uses the logged-in dashboard user’s JWT automatically.
6. The backend stores:
   - app/site name
   - total minutes
   - activity-level minutes
   - platform/device
   - productivity category
   - timestamp
Desktop-tracker pipeline
1. Checks the active Windows application every second.
2. Maps process names to readable app names, such as Chrome, VS Code, Discord, Spotify, etc.
3. Categorizes some applications:
   - Productive: VS Code, Postman
   - Unproductive: Spotify, Discord
   - Others: neutral
4. Sends accumulated data every five minutes to the same /api/usage endpoint.
Backend API groups
- /api/auth — register, login, authenticated profile retrieval.
- /api/usage — create and retrieve raw tracked usage.
- /api/dashboard/analytics — today’s totals and top apps.
- /api/dashboard/productivity — productivity score, focus score, changes vs. yesterday.
- /api/dashboard/activity-analytics — grouped activity totals.
- /api/analytics/daily — daily app/category/hour data.
- /api/analytics/weekly — seven-day usage data.
- /api/analytics/features — combined feature data for app analytics, reports, behaviour, forecasts, activities, and goals.
- /api/goals — create, list, update, delete goals.
- /api/goals/progress — live goal progress and streak.
- /api/insights — generated recommendations and wellbeing insights.
Analytics currently implemented
The project currently uses rule-based analytics and deterministic calculations:
- Screen time: sum of Usage.totalTime.
- App analytics: group usage records by app/site.
- Activity breakdown: group the activities map for each app.
- Daily/weekly charts: group usage by date and hour.
- Productivity score:
(productive time × 1 + neutral time × 0.5) / total screen time × 100
- Focus score: combines productive ratio, unproductive ratio, and a context-switch penalty.
- Goals: compares live tracked minutes with screen-time, productive-time, or app-limit targets.
- Streaks: counts consecutive days below the primary screen-time target.
- Insights: threshold/rule-driven messages, such as high screen time, high distracting use, most-used app, and achieved goals.
Machine learning status
There is currently no trained machine-learning model in the repository.
There is no TensorFlow, PyTorch, scikit-learn, model artifact, training script, model-serving API, feature store, or external AI model integration.
The “Predictions” page currently uses a simple heuristic:
- Tomorrow’s predicted screen time = average tracked daily screen time from active days in the last week.
- Per-app forecast = current app usage normalized against active days.
- Productivity forecast = average weighted productivity across recent active days.
- Confidence = derived from how many active days are available, capped at 95%.
So it is analytics-based forecasting, not machine learning.
To add real ML later, you would need historical labeled data, feature engineering, a training pipeline, model evaluation, versioned model storage, and a prediction-serving endpoint.