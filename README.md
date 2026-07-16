# 📋 Corporate Board Management System

A highly responsive, enterprise-grade Agile Kanban Board application built with **Next.js**, **React Hook Form**, and **MySQL**. It features an optimal single-row fluid card design, an adaptive dark mode matrix, and real-time state synchronizations via Next.js Server Actions.

---

## ✨ Key Enterprise Features

- **Full CRUD Workflow Integration:** Seamlessly create, read, update details, adjust workflow states, and clear tasks with contextual live toast notifications.
- **Universal Search Engine:** An all-in-one search query bar that simultaneously scans through task `Titles`, `Descriptions`, `Assignees`, and custom metadata `Labels`.
- **Dynamic Contextual Filters:** Automatic evaluation and population of filter dropdown options (Assignees, Labels, and Priorities) derived straight from your live database entries without any predefined hardcoding.
- **Smart Priority Matrix Sorting:** Chronological tracking that automatically pushes `High` priority items to the top, sorting seamlessly down to `Medium` and `Low`.
- **Adaptive Dark Mode Layout:** Deep-contrast custom UI token styling that switches beautifully, ensuring high-text legibility and glowing neon indicators on dark screens.
- **Fluid Multi-Device Layout:** 100% responsive card footer and hidden mobile-responsive sidebars to maximize screen real-estate for side-by-side gesture swiping.

---

## 🛠️ Technology Stack

- **Frontend Core:** Next.js (App Router), React, Tailwind CSS
- **Forms & State Validation:** React Hook Form
- **Database Handler:** MySQL (`mysql2/promise` Connection Pooling)
- **State Management & Async Operations:** React Hooks (`useMemo`, `useEffect`) and Server Actions

---

## 🚀 Local Installation & Setup

### 1. Database Initialization
Import your custom `db_backup.sql` file into your local instance of MySQL.

### 2. Configure Environment Properties
Create a `.env.local` file in your root workspace path and append the following credentials matching your `lib/db.js` configurations:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=board_management
```

### 3. Build & Run Application
Execute the following commands in your VS Code integrated terminal workspace root path:

```bash
# Install required dependencies
npm install

# Initialize local server execution
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) inside your preferred web browser to view the operational board.
