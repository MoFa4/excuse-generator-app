# 😂 Random Excuse Generator

A fun, colorful web application that instantly generates the most ridiculous (and believable) excuses for any situation — work, school, meetings, or just life.

**Live Demo**: [https://excuse-generator-app.onrender.com](https://excuse-generator-app.onrender.com)

[![CI/CD Pipeline](https://github.com/MoFa4/excuse-generator-app/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/MoFa4/excuse-generator-app/actions)

![Excuse Generator Screenshot](https://via.placeholder.com/800x450/667eea/ffffff?text=Excuse+Generator+Screenshot)  
*(Replace this line later with a real screenshot — take one from the live site and upload it to the repo)*

## ✨ Features

- Modern, responsive UI with gradient background & glassmorphism card
- Playful Comic Neue font for the title + smooth hover animations
- Random excuse generation from different categories (work, school, meeting, general)
- Zero-touch CI/CD — push code → auto-build → auto-deploy
- Error handling & friendly fallback pages
- Fully containerized with Docker

## 🛠️ Tech Stack

| Layer              | Technology                     | Purpose                              |
|---------------------|--------------------------------|--------------------------------------|
| Backend            | Node.js + Express              | Web server & routing                 |
| Containerization   | Docker                         | Consistent, portable packaging       |
| CI/CD              | GitHub Actions                 | Automated build, push & deploy       |
| Image Registry     | Docker Hub                     | Public storage for Docker images     |
| Hosting            | Render.com                     | Free, auto-deploy PaaS               |
| Styling            | Inline CSS + Google Fonts      | Fast, no external CSS files          |

## 🚀 How the Pipeline Works

1. Push to `main` branch  
2. GitHub Actions workflow triggers  
3. Builds Docker image  
4. Pushes image to Docker Hub  
5. Sends webhook to Render → instant redeploy  

→ Zero manual steps from code change to live site
