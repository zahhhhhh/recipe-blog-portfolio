# Recipe Review Blog

A single-author recipe review blog built as a full-stack university web programming project. The author publishes tested recipes with ingredients, preparation instructions, a personal review, and a rating out of 5.

## Main Features

- Public homepage listing recipe reviews
- Individual recipe detail pages
- About page
- Single-author admin login
- Admin form for creating new recipes
- SQLite database storage
- Client-side **Load More Recipes** feature using the Fetch API and DOM scripting

## Technology Stack

- Node.js
- Express.js
- EJS
- SQLite (`sqlite3`)
- HTML5, CSS3, and plain browser JavaScript
- `express-session` for admin sessions
- `dotenv` for environment configuration

## Setup Instructions

1. Clone or download this repository.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

4. Create your local environment file:

```bash
copy .env.example .env
```

On macOS/Linux, use:

```bash
cp .env.example .env
```

5. Open `.env` and replace the placeholder values with your own:

```env
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
SESSION_SECRET=your_session_secret
```

6. Start the application:

```bash
npm start
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `ADMIN_USERNAME` | Username for the single admin login |
| `ADMIN_PASSWORD` | Password for the single admin login |
| `SESSION_SECRET` | Secret used to sign the Express session |

`.env` is ignored by Git and should not be committed. Use `.env.example` as a template only.

## Database Behaviour

The SQLite database file is stored at `database/recipes.db`.

- The database file is **not** committed to Git.
- On first run, if `recipes.db` does not exist, the application creates it automatically.
- The application also creates the `posts` table if it does not already exist.
- If the `posts` table is empty, the application seeds **9 sample recipes** automatically.

This means a fresh clone can start the app and immediately see sample recipe data without importing a database file.

The local database file is ignored through `.gitignore` (`database/*.db` and `*.db`).

## Load More Recipes (AJAX)

The homepage initially displays **3 recipes**.

Below the recipe grid, a **Load More Recipes** button uses client-side JavaScript and the native Fetch API to request additional recipes from:

```text
GET /api/recipes?offset=...&limit=3
```

Each click loads the next 3 recipes and appends them to the existing grid with DOM manipulation, without refreshing the page. When all recipes have been loaded, the button is hidden.

With the 9 seeded recipes, the expected behaviour is:

1. Initial load: 3 recipes
2. First click: 6 recipes visible
3. Second click: 9 recipes visible
4. Button then hidden because there are no more recipes

## Useful Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage and recipe list |
| `/posts/:id` | Recipe detail page |
| `/about` | About page |
| `/admin/login` | Admin login |
| `/admin/new` | Create a new recipe (admin only) |
| `/api/recipes` | JSON endpoint used by Load More |

## Repository Notes

- Commit source code, `.gitignore`, `.env.example`, and `README.md`.
- Do **not** commit `.env`, `node_modules/`, or `database/recipes.db`.
- After cloning, always create your own `.env` file before using the admin area.
