const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'recipes.db');
const db = new sqlite3.Database(dbPath);

const sampleRecipes = [
  {
    title: 'Creamy Garlic Pasta',
    ingredients: '200g spaghetti\n4 garlic cloves, minced\n2 tbsp butter\n200ml double cream\n50g grated Parmesan\nSalt and black pepper\nFresh parsley',
    instructions: '1. Cook the spaghetti in salted boiling water until al dente, then drain and reserve a little pasta water.\n2. Melt the butter in a pan and gently fry the garlic until fragrant.\n3. Stir in the cream and simmer for 2–3 minutes.\n4. Add the Parmesan and toss in the pasta, loosening with pasta water if needed.\n5. Season with salt and pepper, then finish with chopped parsley.',
    review: 'Rich, comforting, and ready in under 30 minutes. The garlic comes through clearly without overpowering the cream, and a little pasta water makes the sauce cling beautifully. A weeknight favourite.',
    rating: 5
  },
  {
    title: 'Classic Chocolate Brownies',
    ingredients: '150g dark chocolate\n150g unsalted butter\n200g caster sugar\n2 large eggs\n100g plain flour\n30g cocoa powder\n1 tsp vanilla extract\nPinch of salt',
    instructions: '1. Preheat the oven to 180°C and line a square baking tin.\n2. Melt the chocolate and butter together, then leave to cool slightly.\n3. Whisk in the sugar, eggs, and vanilla until glossy.\n4. Fold in the flour, cocoa, and salt.\n5. Pour into the tin and bake for 20–25 minutes until set on top but still soft in the centre.\n6. Cool before slicing.',
    review: 'Fudgy in the middle with a thin crackly top — exactly what I want from a brownie. Easy to make and hard to stop at one square. Slightly underbaking is the secret.',
    rating: 4
  },
  {
    title: 'Homemade Chicken Curry',
    ingredients: '500g chicken thighs, diced\n1 onion, chopped\n3 garlic cloves\n1 tbsp grated ginger\n2 tbsp curry powder\n400ml coconut milk\n1 tin chopped tomatoes\n2 tbsp oil\nSalt\nFresh coriander',
    instructions: '1. Heat the oil and soften the onion for 5 minutes.\n2. Add the garlic, ginger, and curry powder and cook for 1 minute.\n3. Stir in the chicken and brown lightly on all sides.\n4. Pour in the tomatoes and coconut milk, then simmer for 25–30 minutes until the chicken is tender.\n5. Season with salt and scatter over fresh coriander before serving with rice.',
    review: 'Warming and full of flavour without being complicated. The coconut milk keeps the sauce gentle, and leftover portions taste even better the next day. Great for a Sunday cook.',
    rating: 5
  },
  {
    title: 'Fluffy Banana Pancakes',
    ingredients: '2 ripe bananas\n2 eggs\n150g plain flour\n1 tsp baking powder\n120ml milk\n1 tsp vanilla extract\nButter for cooking',
    instructions: '1. Mash the bananas in a large bowl.\n2. Add the eggs, milk and vanilla extract and mix well.\n3. Add the flour and baking powder and stir until combined.\n4. Heat a small amount of butter in a frying pan over medium heat.\n5. Spoon the batter into the pan and cook until bubbles appear on the surface.\n6. Flip the pancakes and cook until golden brown.\n7. Serve warm with your preferred toppings.',
    review: 'These pancakes were soft, fluffy and easy to prepare. The banana added enough natural sweetness without making them too heavy. I would make this recipe again, especially for a quick weekend breakfast.',
    rating: 5
  },
  {
    title: 'Chicken Alfredo',
    ingredients: '2 chicken breasts\n250g fettuccine pasta\n2 tablespoons butter\n3 cloves garlic, minced\n1 cup heavy cream\n1 cup grated Parmesan cheese\n1 tablespoon olive oil\nSalt and black pepper to taste\nFresh parsley for garnish',
    instructions: 'Cook the fettuccine according to the package instructions and drain. Season the chicken with salt and pepper. Heat the olive oil in a pan and cook the chicken until golden and fully cooked, then slice it into strips. Melt the butter in the same pan and sauté the garlic. Add the cream and simmer gently. Stir in the Parmesan until smooth. Add the pasta and toss until coated. Top with the chicken and parsley.',
    review: 'Creamy, comforting and easy to prepare. The Parmesan sauce pairs perfectly with the seasoned chicken and makes this a great dinner recipe.',
    rating: 5
  },
  {
    title: 'Homemade Beef Burgers',
    ingredients: '500g ground beef\n4 burger buns\n1 small onion, finely chopped\n1 teaspoon garlic powder\n1 teaspoon paprika\nSalt and black pepper to taste\n4 slices cheddar cheese\nLettuce\nTomato slices\nBurger sauce',
    instructions: 'Combine the ground beef, onion, garlic powder, paprika, salt and pepper. Divide into four portions and shape into patties. Cook in a hot pan for about 4 to 5 minutes on each side or until cooked through. Add cheese during the final minute. Toast the buns lightly and assemble with lettuce, tomato, the beef patty and burger sauce.',
    review: 'Juicy and full of flavour with simple homemade seasoning. Toasting the buns gives the burgers an even better texture.',
    rating: 4
  },
  {
    title: 'Lemon Garlic Chicken',
    ingredients: '4 chicken breasts\n3 cloves garlic, minced\n2 tablespoons olive oil\nJuice of 1 lemon\n1 teaspoon dried oregano\n1 teaspoon paprika\nSalt and black pepper to taste\nFresh parsley for garnish',
    instructions: 'Season the chicken with salt, pepper, paprika and oregano. Heat the olive oil in a pan and cook the chicken until golden on both sides. Add the garlic and cook briefly. Pour in the lemon juice and simmer until the chicken is fully cooked. Garnish with parsley.',
    review: 'Fresh, simple and flavourful. The lemon keeps the dish light while the garlic and herbs give the chicken plenty of flavour.',
    rating: 5
  },
  {
    title: 'Chocolate Chip Cookies',
    ingredients: '2 cups all-purpose flour\n1/2 teaspoon baking soda\n170g butter, softened\n1 cup brown sugar\n1/2 cup white sugar\n1 egg\n1 teaspoon vanilla extract\n1 cup chocolate chips\nPinch of salt',
    instructions: 'Preheat the oven to 180°C. Mix the flour, baking soda and salt. In another bowl, cream the butter with the brown and white sugar. Add the egg and vanilla. Gradually add the dry ingredients and fold in the chocolate chips. Place spoonfuls of dough on a lined baking tray and bake for 10 to 12 minutes until the edges are lightly golden.',
    review: 'Soft in the centre with slightly crisp edges. These are simple to make and have just the right amount of chocolate in every bite.',
    rating: 5
  },
  {
    title: 'Vegetable Fried Rice',
    ingredients: '3 cups cooked and cooled rice\n1 carrot, diced\n1/2 cup frozen peas\n1/2 cup sweetcorn\n2 eggs\n2 tablespoons soy sauce\n1 tablespoon vegetable oil\n2 spring onions, sliced\n1 clove garlic, minced\nBlack pepper to taste',
    instructions: 'Heat the oil in a large pan or wok. Add the carrot and garlic and cook for 2 to 3 minutes. Add the peas and sweetcorn. Push the vegetables to one side and scramble the eggs on the other side. Add the cooked rice and combine everything. Add the soy sauce and stir-fry for another 2 to 3 minutes. Finish with spring onions and black pepper.',
    review: 'Quick, colourful and a good way to use leftover rice. Using cold cooked rice helps prevent the finished dish from becoming too soft.',
    rating: 4
  }
];

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

      sampleRecipes.forEach((recipe) => {
        insert.run(
          recipe.title,
          recipe.ingredients,
          recipe.instructions,
          recipe.review,
          recipe.rating
        );
      });

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
