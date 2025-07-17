# FindAnime

## Introduction
FindAnime is a modern, mobile-friendly web application that helps users discover anime by searching with a name or a description. It features a beautiful, animated interface and provides real-time anime data and recommendations using the Jikan API (MyAnimeList). The project aims to make anime discovery fun, easy, and visually engaging for all fans.

## Features

### 1. Search & Discovery
- **Search by Name or Description:** Users can search for anime by title or by describing what they want to watch (e.g., "time travel, romance, action").
- **Instant Results:** See relevant anime instantly, with posters and short descriptions.

### 2. Top Anime Showcase
- **Trending Anime:** The homepage displays a grid of top anime posters with short, engaging descriptions.
- **Live Data:** All anime data is fetched in real-time from the Jikan API.

### 3. Anime List
- **Browse All:** Explore a general list of anime in a modern, animated grid layout.

### 4. Detailed Anime Modal
- **Click for Details:** Clicking any anime opens a beautiful, animated modal with full details (title, year, genres, synopsis, score, and more).
- **Animated & Responsive:** The modal features smooth animations and adapts to all screen sizes.

### 5. Mobile Responsive & Modern UI
- **Fully Responsive:** The UI adapts seamlessly to mobile, tablet, and desktop screens.
- **Modern Design:** Uses a dark theme, Google Fonts, and animated transitions for a premium feel.

### 6. Deployment Ready
- **Easy Deployment:** Configured for one-click deployment on Vercel, with custom routing for API and static frontend.


## Technologies & APIs Used
- **Frontend:** HTML, CSS (modern, responsive, animated), JavaScript (vanilla)
- **Backend:** Node.js with Express.js
- **Anime Data:** [Jikan API](https://jikan.moe/) (unofficial MyAnimeList API)
- **Deployment:** Vercel 

## How to Run Locally
1. **Install backend dependencies:**
    ```bash
    cd node-backend
    npm install
    ```
2. **Start the backend:**
    ```bash
    node index.js
    ```
3. **Serve the frontend:**
    ```bash
    cd ../node-frontend
    npx serve .
    ```
    Then open the provided URL in your browser.
---

Enjoy discovering your next favorite anime with FindAnime!