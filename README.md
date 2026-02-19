# Inno Test Task

## Task

Deploy: https://inno-tasck-class.netlify.app/.

## How to run the app

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run in development mode**

   ```bash
   npm run dev
   ```

   The app will be available on the URL shown in the terminal (by default something like `http://localhost:5173`).

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview the production build locally (optional)**

   ```bash
   npm run preview
   ```

## Folder structure (short overview)

- **`src/`**: main application source code.
  - **`src/components/`**: reusable UI components (cards, search form, favorites sidebar, header, footer, etc.). Each subfolder usually contains a component file and its CSS module.
  - **`src/pages/`**: page-level components (for example, search page) that compose multiple UI components and contain page-specific logic.
  - **`src/api/`**: API layer for working with the Open Library service, including URL builders and mapping raw responses to app models.
  - **`src/router/`**: simple client-side router configuration and route helpers.
  - **`src/utils/`**: shared utilities (DOM helpers, icons, debounce, favorites storage, search query storage, formatting helpers, etc.).
  - **`src/constants/`**: text constants, UI labels, and other shared configuration values.
  - **`src/styles/`**: global styles, CSS variables, and reset styles.
  - **`src/main.js`**: application entry point that bootstraps the app.
