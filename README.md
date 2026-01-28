# SPIN_AU_INT
Solution to technical challenge presented in the internship interview for SPIN AU Global 

# Task Management System with Workloads

A React-based Task Management System designed to handle "Workloads"—specific active ranges within a task duration. Built as a separate modular application that runs directly in the browser.

## 🚀 Setup & How to Run
**Prerequisite**: You need Python installed in your environment (or VS Code Live Server).

1.  **Start the Server**:
    *   Navigate to the project folder.
    *   Double-click the **`start_server.bat`** file.
    *   A black window will appear. Keep it open.
2.  **Open the App**:
    *   Open your web browser.
    *   Go to **[http://localhost:8000](http://localhost:8000)**.
    *   *Note: If you close the black window, the app will stop working.*

**Why is a server needed?**
We use a modular file structure (`src/components/...`). Browsers block loading separate files directly from the disk for security reasons. The local server allows them to load correctly.

## 💡 Approach & Architecture
This project uses a **Serverless Modular Architecture**:
*   **React (No Build)**: We use React and Babel via CDN. This avoids the complexity of `npm install`, `node_modules`, and build steps.
*   **Sequential Loading**: Components are loaded one-by-one in `index.html` and attached to the global `window` object. This allows us to separate code into clean files (`TaskTable.jsx`, `TaskModal.jsx`) without a bundler like Webpack.
*   **LocalStorage Persistence**: Data is saved to the browser's LocalStorage (`sol_spin_tasks`). This provides persistence without a backend database.

## ✨ Features
*   **Task Management**: Add, Edit, and View tasks.
*   **Workloads**: A "task" can have multiple "workload" ranges (e.g., working Jan 5-7 and Jan 15-20), separate from the main start/end dates.
*   **Responsive UI**: Custom CSS styling in `style.css`.

## 📂 File Structure
*   `index.html`: Main entry point.
*   `style.css`: All application styling.
*   `src/components/`: Individual React components (Table, Modal, Logic).
*   `start_server.bat`: Helper script to launch the app.
