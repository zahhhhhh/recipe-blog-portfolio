const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'recipes.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      review TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.get('SELECT COUNT(*) AS count FROM posts', (err, row) => {
    if (err) {
      console.error('Error checking posts table:', err.message);
      return;
    }

    if (row.count === 0) {
      const insert = db.prepare(`
        INSERT INTO posts (title, ingredients, instructions, review, rating)
        VALUES (?, ?, ?, ?, ?)
      `);

      insert.run(
        'Creamy Garlic Pasta',
        '200g spaghetti\n4 garlic cloves, minced\n2 tbsp butter\n200ml double cream\n50g grated Parmesan\nSalt and black pepper\nFresh parsley',
        '1. Cook the spaghetti in salted boiling water until al dente, then drain and reserve a little pasta water.\n2. Melt the butter in a pan and gently fry the garlic until fragrant.\n3. Stir in the cream and simmer for 2–3 minutes.\n4. Add the Parmesan and toss in the pasta, loosening with pasta water if needed.\n5. Season with salt and pepper, then finish with chopped parsley.',
        'Rich, comforting, and ready in under 30 minutes. The garlic comes through clearly without overpowering the cream, and a little pasta water makes the sauce cling beautifully. A weeknight favourite.',
        5
      );

      insert.run(
        'Classic Chocolate Brownies',
        '150g dark chocolate\n150g unsalted butter\n200g caster sugar\n2 large eggs\n100g plain flour\n30g cocoa powder\n1 tsp vanilla extract\nPinch of salt',
        '1. Preheat the oven to 180°C and line a square baking tin.\n2. Melt the chocolate and butter together, then leave to cool slightly.\n3. Whisk in the sugar, eggs, and vanilla until glossy.\n4. Fold in the flour, cocoa, and salt.\n5. Pour into the tin and bake for 20–25 minutes until set on top but still soft in the centre.\n6. Cool before slicing.',
        'Fudgy in the middle with a thin crackly top — exactly what I want from a brownie. Easy to make and hard to stop at one square. Slightly underbaking is the secret.',
        4
      );

      insert.run(
        'Homemade Chicken Curry',
        '500g chicken thighs, diced\n1 onion, chopped\n3 garlic cloves\n1 tbsp grated ginger\n2 tbsp curry powder\n400ml coconut milk\n1 tin chopped tomatoes\n2 tbsp oil\nSalt\nFresh coriander',
        '1. Heat the oil and soften the onion for 5 minutes.\n2. Add the garlic, ginger, and curry powder and cook for 1 minute.\n3. Stir in the chicken and brown lightly on all sides.\n4. Pour in the tomatoes and coconut milk, then simmer for 25–30 minutes until the chicken is tender.\n5. Season with salt and scatter over fresh coriander before serving with rice.',
        'Warming and full of flavour without being complicated. The coconut milk keeps the sauce gentle, and leftover portions taste even better the next day. Great for a Sunday cook.',
        5
      );

      insert.finalize((finalizeErr) => {
        if (finalizeErr) {
          console.error('Error seeding sample recipes:', finalizeErr.message);
        } else {
          console.log('Sample recipes added to the database.');
        }
      });
    }
  });
});

module.exports = db;
