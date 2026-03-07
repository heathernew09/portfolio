# 🎨 Heather New - Creative Technologist Portfolio

This is the source code for [heathernew.com](https://heathernew.com), a high-performance portfolio showcasing work at the intersection of design and engineering.

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![Tech Stack](https://img.shields.io/badge/stack-Vite%20%7C%20Vanilla%20JS%20%7C%20JSON--Driven-blue)

## 🚀 Technical Highlights

- **Vite-Powered Pipeline:** Modern build toolchain for optimized asset delivery.
- **JSON-Driven Architecture:** Project gallery is rendered dynamically from a central data source (`projects.json`), allowing for near-instant updates.
- **Custom HTML Include Engine:** A modular partial system that handles component-based development without the overhead of a heavy framework.
- **Automated DevOps:** Custom Bash-based deployment pipeline syncing local builds to SiteGround with automated backups and cache invalidation.
- **3D & Interactive UI:** Implementation of perspective-based 3D tilt effects and interactive hero sections.

## 🏗 Directory Structure

- `public_html/`: Entry point and root index.
- `public/`: Static assets (Images, Videos, JSON data, JS Components).
- `dist/`: Optimized production build (generated).
- `ProjectAssets/`: (Local Only) Raw design files, PSDs, and project briefs.

## 🛠 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run dev server:**
   ```bash
   npm run dev
   ```
3. **Deploy to production:**
   ```bash
   ./deploy.sh
   ```

---
Built by Heather New. Engineered for performance.
