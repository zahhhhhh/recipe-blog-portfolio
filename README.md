# Recipe Review Blog

Recipe Review Blog is a full-stack, single-author culinary blog developed as a university web programming portfolio project. The application allows an author to publish personally tested recipes together with ingredients, preparation instructions, personal reviews, and ratings.

Visitors can browse published recipes from the homepage and open individual recipe pages to view the complete recipe. A protected administration area allows the blog author to log in and publish new recipes.

## Project Purpose

The purpose of this project is to demonstrate the development of a functional database-driven web application using frontend and server-side web technologies.

The project demonstrates:

- Server-side development with Node.js and Express.js
- Dynamic page rendering using EJS
- Persistent data storage using SQLite
- HTTP routing and form processing
- Input validation and error handling
- Session-based administrator access
- Responsive frontend design
- Separation of public and administrative functionality

The application intentionally uses a small and focused scope. Features such as public user registration, comments, multiple administrator accounts, image uploads, and complex content management functionality are outside the scope of the project.

## Features

### Public Recipe Homepage

The homepage retrieves published recipes from the SQLite database and displays them in a responsive recipe-card layout. Each recipe includes its title, rating, publication date, a short review preview, and a link to the complete recipe.

### Recipe Detail Pages

Each recipe has an individual dynamic route using its database ID. The recipe detail page displays:

- Recipe title
- Ingredients
- Preparation instructions
- Author review
- Rating
- Publication date

Invalid recipe IDs are handled with an appropriate not-found response.

### About Page

The About page provides a short explanation of the purpose and concept of the Recipe Review Blog.

### Administrator Login

Recipe creation is restricted to the single blog author. Administrator credentials are supplied through environment variables rather than being stored directly in the application source code.

The application uses session-based authentication to protect the recipe creation route.

### Recipe Creation

After logging in, the administrator can create a new recipe using a web form.

The form accepts:

- Recipe title
- Ingredients
- Preparation instructions
- Personal review
- Rating from 1 to 5

Submitted information is validated before being inserted into the SQLite database. After successful creation, the administrator is redirected to the newly published recipe.

### Validation and Error Handling

The application performs validation to prevent incomplete or invalid recipe information from being stored.

Required fields cannot be empty, and recipe ratings must be between 1 and 5.

The application also handles invalid recipe IDs and database errors appropriately.

### Responsive Design

The interface uses a responsive culinary-themed design created with custom CSS. Recipe cards, navigation, forms, and content layouts adapt to different screen sizes without requiring an external CSS framework.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Application programming |
| Node.js | Server-side runtime environment |
| Express.js | Web server, routing and form handling |
| EJS | Server-side HTML templating |
| SQLite | Local relational database |
| express-session | Administrator session management |
| dotenv | Environment variable configuration |
| Git & GitHub | Version control and project hosting |

## Application Flow

### Visitor Flow

Home → Browse Recipes → Select Recipe → Recipe Detail

Visitors do not need an account to browse recipe content.

### Administrator Flow

Admin Login → Create Recipe → Validate Input → Save to SQLite → Recipe Detail

After publication, the new recipe automatically becomes available on the public homepage.

## Database Structure

The application uses a SQLite database containing a `posts` table.

The main fields are:

| Field | Description |
|---|---|
| `id` | Unique identifier and primary key |
| `title` | Recipe title |
| `ingredients` | Recipe ingredients stored as plain text |
| `instructions` | Preparation instructions stored as plain text |
| `review` | Author's personal review |
| `rating` | Numerical rating between 1 and 5 |
| `created_at` | Date and time the recipe was created |

Recipe content is stored as plain text and is safely rendered through the application's EJS templates.

## Project Structure

The project follows a simple structure suitable for a small Express application:

    recipe-review-blog/
    ├── database/
    │   └── db.js
    ├── public/
    │   └── css/
    │       └── style.css
    ├── views/
    │   ├── index.ejs
    │   ├── post.ejs
    │   ├── about.ejs
    │   ├── admin-login.ejs
    │   └── admin-new.ejs
    ├── .env.example
    ├── .gitignore
    ├── app.js
    ├── package.json
    ├── package-lock.json
    └── README.md

Additional EJS partials may be present for shared interface elements such as the site header and footer.

## Installation and Setup

### 1. Clone the repository

Clone the repository and open the project directory.

### 2. Install dependencies

Run:

    npm install

This installs the dependencies listed in `package.json`.

### 3. Configure environment variables

Create a `.env` file in the root directory of the project.

The required variables are shown in `.env.example`:

    ADMIN_USERNAME=
    ADMIN_PASSWORD=
    SESSION_SECRET=

Add your own local administrator username, password, and session secret.

**Important:** The `.env` file should never be committed to the public repository because it contains private configuration information.

### 4. Start the application

Run:

    npm start

The application will start locally.

Open the local address shown in the terminal, normally:

    http://localhost:3000

## Main Routes

| Route | Purpose |
|---|---|
| `/` | Public recipe homepage |
| `/posts/:id` | Individual recipe page |
| `/about` | About page |
| `/admin/login` | Administrator login |
| `/admin/new` | Protected recipe creation page |

## Security and Configuration

Administrator credentials and the session secret are managed using environment variables.

The `.gitignore` file prevents sensitive and unnecessary local files such as `.env`, `node_modules`, and the local SQLite database from being committed to the repository.

Public registration and multi-user authentication are intentionally excluded because the application is designed as a single-author blog.

## Scope

The project focuses on the core requirements of a small content-management web application:

- Publishing recipes
- Storing recipe data
- Browsing recipe content
- Viewing individual recipes
- Protecting recipe creation
- Validating submitted information

The following features are intentionally outside the project scope:

- Public user accounts
- Comments
- Multiple administrators
- Recipe editing and deletion
- Image uploads
- Social features
- Payments

Keeping the scope focused allowed the core application flow to be implemented and tested reliably.



Developed as a university web programming portfolio project.
