require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./database/db');

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Parse form data and serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Simple session for single-author admin login
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-session-secret',
  resave: false,
  saveUninitialized: false
}));

// Middleware: allow only logged-in admin
function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.redirect('/admin/login');
}

// Homepage route – show the first 3 recipes
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM posts ORDER BY created_at DESC LIMIT 3';

  db.all(sql, [], (err, posts) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Error loading recipes.');
    }

    db.get('SELECT COUNT(*) AS total FROM posts', (countErr, row) => {
      if (countErr) {
        console.error(countErr.message);
        return res.status(500).send('Error loading recipes.');
      }

      res.render('index', {
        posts,
        totalRecipes: row.total
      });
    });
  });
});

// JSON API for Load More Recipes (AJAX)
app.get('/api/recipes', (req, res) => {
  const offset = parseInt(req.query.offset, 10);
  const limit = parseInt(req.query.limit, 10);

  const safeOffset = Number.isNaN(offset) || offset < 0 ? 0 : offset;
  const safeLimit = Number.isNaN(limit) || limit < 1 ? 3 : Math.min(limit, 3);

  const sql = 'SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?';

  db.all(sql, [safeLimit, safeOffset], (err, posts) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error loading recipes.' });
    }

    db.get('SELECT COUNT(*) AS total FROM posts', (countErr, row) => {
      if (countErr) {
        console.error(countErr.message);
        return res.status(500).json({ error: 'Error loading recipes.' });
      }

      res.json({
        posts,
        total: row.total,
        offset: safeOffset,
        limit: safeLimit
      });
    });
  });
});

// Individual recipe detail route
app.get('/posts/:id', (req, res) => {
  const sql = 'SELECT * FROM posts WHERE id = ?';

  db.get(sql, [req.params.id], (err, post) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Error loading recipe.');
    }

    if (!post) {
      return res.status(404).send('Recipe not found.');
    }

    res.render('post', { post });
  });
});

// About page
app.get('/about', (req, res) => {
  res.render('about');
});

// Admin login page
app.get('/admin/login', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/admin/new');
  }
  res.render('admin-login', { error: null });
});

// Admin login form submit
app.post('/admin/login', (req, res) => {
  const username = (req.body.username || '').trim();
  const password = req.body.password || '';

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    return res.status(500).render('admin-login', {
      error: 'Admin credentials are not configured. Check your .env file.'
    });
  }

  if (username === adminUsername && password === adminPassword) {
    req.session.isAdmin = true;
    return res.redirect('/admin/new');
  }

  res.render('admin-login', { error: 'Invalid username or password.' });
});

// Admin logout
app.post('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

// Create recipe page (protected)
app.get('/admin/new', requireAdmin, (req, res) => {
  res.render('admin-new', { error: null, form: {} });
});

// Create recipe form submit (protected)
app.post('/admin/new', requireAdmin, (req, res) => {
  const title = (req.body.title || '').trim();
  const ingredients = (req.body.ingredients || '').trim();
  const instructions = (req.body.instructions || '').trim();
  const review = (req.body.review || '').trim();
  const rating = parseInt(req.body.rating, 10);

  const form = { title, ingredients, instructions, review, rating: req.body.rating };

  if (!title || !ingredients || !instructions || !review) {
    return res.render('admin-new', {
      error: 'Please fill in all fields.',
      form
    });
  }

  if (Number.isNaN(rating) || rating < 1 || rating > 5) {
    return res.render('admin-new', {
      error: 'Rating must be a whole number between 1 and 5.',
      form
    });
  }

  const sql = `
    INSERT INTO posts (title, ingredients, instructions, review, rating)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [title, ingredients, instructions, review, rating], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).render('admin-new', {
        error: 'Could not save the recipe. Please try again.',
        form
      });
    }

    res.redirect('/posts/' + this.lastID);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
