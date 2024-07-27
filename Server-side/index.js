const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.static('public'));
const restaurants = [
  {
    id: 1,
    name: 'Lucky Cat',
    rating: 4.5,
    serverCuisine: 'Drinks',
    imageUrl: 'logos/7.png',
    menu: [
      { id:11, name: 'Cappuccino', price: '$3.50', rating: 4.2, image: 'https://choicemarket.co/cdn/shop/files/Cappuccino.jpg?v=1698521269' },
      { id:12, name: 'Latte', price: '$4.00', rating: 4.0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVLYmYLecpW1XE8GRq6NhpXCtvueiTgdYrIw&s' },
      { id:13, name: 'Espresso', price: '$2.50', rating: 4.3, image: 'https://cdnprod.mafretailproxy.com/sys-master-root/hfe/h1b/15418586562590/511351_main.jpg_480Wx480H' }
    ]
  },
  {
    id: 2,
    name: 'Master Chief',
    rating: 4.0,
    serverCuisine: 'Pasta',
    imageUrl: 'logos/3.png',
    menu: [
      {id:21, name: 'Spaghetti Carbonara', price: '$12.00', rating: 4.5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3xmBLnEEZiONfdpuyDNCZadCZbi3qmGZSAQ&s' },
      {id:22, name: 'Fettuccine Alfredo', price: '$13.00', rating: 4.3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2EmbIr6HlzBs0GWcDZ_nZlxKELgiK26KHg&s' },
      {id:23, name: 'Penne Arrabbiata', price: '$11.00', rating: 4.1, image: 'https://www.lastingredient.com/wp-content/uploads/2019/02/penne-arrabbiata-with-chickpeas4.jpg' }
    ]
  },
  {
    id: 3,
    name: 'Hot Restaurant',
    rating: 3.5,
    serverCuisine: 'Chicken',
    imageUrl: 'logos/6.jpg',
    menu: [
      {id:31, name: 'Grilled Chicken Breast', price: '$15.00', rating: 3.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQytoUaMRJ7jQCV8hgSkJzAAE3E1v3ze2AOHg&s' },
      {id:32, name: 'Chicken Alfredo', price: '$16.00', rating: 3.7, image: 'https://www.budgetbytes.com/wp-content/uploads/2022/07/Chicken-Alfredo-above-500x500.jpg' },
      {id:33, name: 'Chicken Wings', price: '$12.00', rating: 3.8, image: 'https://www.flavcity.com/wp-content/uploads/2019/01/baked-chicken-wings.jpg' }
    ]
  },
  {
    id: 4,
    name: 'Best Pizza',
    rating: 5.0,
    serverCuisine: 'Pizza',
    imageUrl: 'logos/13.png',
    menu: [
      {id:41, name: 'Margherita Pizza', price: '$14.00', rating: 5.0, image: 'https://images.prismic.io/eataly-us/ed3fcec7-7994-426d-a5e4-a24be5a95afd_pizza-recipe-main.jpg?auto=compress,format' },
      {id:42, name: 'Pepperoni Pizza', price: '$15.00', rating: 4.9, image: 'https://ohsweetbasil.com/wp-content/uploads/2013/04/Want-the-perfect-recipe-for-pepperoni-Pizza-that-tastes-as-good-as-your-favorite-takeout-Click-through-ohsweetbasil.com_-e1414729085254.jpg' },
      {id:43, name: 'BBQ Chicken Pizza', price: '$16.00', rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWwflLaBPBhTxj1RsSfOASR12tX3RWdu-tSA&s' }
    ]
  },
  {
    id: 5,
    name: 'Harvey',
    rating: 4.2,
    serverCuisine: 'Burger',
    imageUrl: 'logos/8.png',
    menu: [
      {id:51, name: 'Cheeseburger', price: '$10.00', rating: 4.3, image: 'https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0__FillWzExNzAsNTgzXQ.jpg' },
      {id:52, name: 'Bacon Burger', price: '$11.00', rating: 4.1, image: 'https://hips.hearstapps.com/hmg-prod/images/copycat-western-bacon-cheeseburger-2-1649170836.jpg?crop=0.667xw:1.00xh;0.131xw,0&resize=1200:*' },
      {id:53, name: 'Veggie Burger', price: '$9.00', rating: 4.0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQVrO9FKarrAGq08vByBi6iEz-wLoEUi7c_g&s' }
    ]
  },
  {
    id: 6,
    name: 'Good Mood',
    rating: 4.8,
    serverCuisine: 'Drinks',
    imageUrl: 'logos/1.png',
    menu: [
      {id:61, name: 'Mocha', price: '$4.50', rating: 4.7, image: 'https://gatherforbread.com/wp-content/uploads/2014/10/Dark-Chocolate-Mocha-Square.jpg' },
      {id:62, name: 'Hot Chocolate', price: '$3.75', rating: 4.6, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaGZp6On3eLfwQH_QkanvFR7WH-DEEZISrSA&s' },
      {id:63, name: 'Iced Tea', price: '$3.00', rating: 4.4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8yzBdDyaEjdSWplpOmTnzmyU8cZj44F-03A&s' }
    ]
  },
  {
    id: 7,
    name: 'Food Rusty',
    rating: 4.1,
    serverCuisine: 'Pasta',
    imageUrl: 'logos/4.jpg',
    menu: [
      {id:71, name: 'Lasagna', price: '$14.50', rating: 4.2, image: 'https://www.southernliving.com/thmb/x5xM5QvARl_og39g1jD1N1HfUlA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Extra_Easy_Lasagna_005_16x9-24d8c7469367440bb9aad73e9a83ded9.jpg' },
      {id:72, name: 'Baked Ziti', price: '$13.50', rating: 4.0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX38J2Zmt7EG6RoTl90sdjdICXWyMmuUaDAg&s' },
      {id:73, name: 'Ravioli', price: '$12.50', rating: 4.1, image: 'https://iambaker.net/wp-content/uploads/2019/11/raviloi-blog.jpg' }
    ]
  },
  {
    id: 8,
    name: 'Fauget',
    rating: 3.9,
    serverCuisine: 'Chicken',
    imageUrl: 'logos/11.png',
    menu: [
      {id:81, name: 'Buffalo Chicken Salad', price: '$13.00', rating: 3.8, image: 'https://mccormick.widen.net/content/nlcamvgp47/webp/Franks%20RedHot%20Buffalo%20Chicken%20Salad-1376x774.webp?crop=true&anchor=301,0&color=ffffffff&u=eelhgb&w=774&h=774' },
      {id:82, name: 'Chicken Tenders', price: '$11.50', rating: 4.0, image: 'https://www.wellplated.com/wp-content/uploads/2023/05/Oven-Fried-Chicken-Tenders-Recipe.jpg' },
      {id:83, name: 'Chicken Parmesan', price: '$14.50', rating: 3.7, image: 'https://www.mamaknowsglutenfree.com/wp-content/uploads/2023/06/gluten-free-chicken-parmesan-rc-1.jpg' }
    ]
  },
  {
    id: 9,
    name: 'Pizza Man',
    rating: 4.6,
    serverCuisine: 'Pizza',
    imageUrl: 'logos/14.png',
    menu: [
      {id:91, name: 'Hawaiian Pizza', price: '$15.50', rating: 4.6, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8FJsv8oVN9lelgM2ygJFmaoG8K33UwD9lLQ&s' },
      {id:92, name: 'Veggie Pizza', price: '$14.50', rating: 4.5, image: 'https://www.superhealthykids.com/wp-content/uploads/2021/10/best-veggie-pizza-featured-image-square-2.jpg' },
      {id:93, name: 'Meat Lovers Pizza', price: '$16.50', rating: 4.4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCTVJZ0JoCH4LqGh38qW_w2kVzY1E6auBz8g&s' }
    ]
  },
  {
    id: 10,
    name: 'Rays',
    rating: 4.3,
    serverCuisine: 'Burger',
    imageUrl: 'logos/9.png',
    menu: [
      {id:101, name: 'Double Cheeseburger', price: '$12.00', rating: 4.4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrensd9resI6LG03WELppGaxKBSOhJuAJflw&s' },
      {id:102, name: 'BBQ Burger', price: '$11.50', rating: 4.2, image: 'https://realfoodbydad.com/wp-content/uploads/2019/07/Southern-BBQ-Burger-Real-Food-by-Dad-683x1024.jpg' },
      {id:103, name: 'Mushroom Burger', price: '$11.00', rating: 4.0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWIefO011m2cNndlFTDQVselc6hVfFNrLE1g&s' }
    ]
  },
  {
    id: 11,
    name: 'Mr Food',
    rating: 4.7,
    serverCuisine: 'Drinks',
    imageUrl: 'logos/5.jpg',
    menu: [
      {id:111, name: 'Smoothie', price: '$5.00', rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjHArZFmC9vryb8PDEzB_M-FjvU8kiPdsG7A&s' },
      {id:112, name: 'Milkshake', price: '$4.50', rating: 4.7, image: 'https://bakingmischief.com/wp-content/uploads/2022/03/coffee-milkshake-square.jpg' },
      {id:113, name: 'Green Tea', price: '$3.25', rating: 4.5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzlyhI9T1lw7Rhf3GUeFmyYjkNw_hzsApV7QAf9pWHJWEQWAIK5Vo7ohNUgmZOvaZHARQ&usqp=CAU' }
    ]
  },
  {
    id: 12,
    name: 'Cooking L',
    rating: 4.4,
    serverCuisine: 'Pasta',
    imageUrl: 'logos/12.png',
    menu: [
      {id:121, name: 'Pasta Primavera', price: '$13.00', rating: 4.5, image: 'https://familystylefood.com/wp-content/uploads/2023/05/Pasta-Primavera-bowl.jpg' },
      {id:122, name: 'Pesto Pasta', price: '$12.50', rating: 4.4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7UeNMIsyg7KSoipM5_1fAT8_04v2pn175wA&s' },
      {id:123, name: 'Mac and Cheese', price: '$11.00', rating: 4.3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDdmlMPSMkf5SOaACLxV_jA7_UK8G7F_fRYA&s' }
    ]
  },
  {
    id: 13,
    name: 'Two Brothers',
    rating: 4.0,
    serverCuisine: 'Chicken',
    imageUrl: 'logos/10.png',
    menu: [
      {id:131, name: 'Chicken Caesar Salad', price: '$12.00', rating: 4.1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWfTeEpnlcutZZs5nGZOPeI33yO1-_uB3Ldg&s' },
      {id:132, name: 'Chicken Tacos', price: '$11.00', rating: 4.0, image: 'https://www.modernhoney.com/wp-content/uploads/2023/01/Chipotle-Chicken-Tacos-2-crop-scaled.jpg' },
      {id:133, name: 'Chicken Quesadilla', price: '$13.00', rating: 4.2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9z-EL0atgSJ0gLzeRtQu_lBfpPUERfkCd-g&s' }
    ]
  },
  {
    id: 14,
    name: 'C Chief',
    rating: 4.9,
    serverCuisine: 'Pizza',
    imageUrl: 'logos/15.png',
    menu: [
      {id:141, name: 'Pepperoni Pizza', price: '$16.00', rating: 5.0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3CwXP0LWAfk6-jYzJeuvJ5H0vBhfga11Czg&s' },
      {id:142, name: 'Cheese Pizza', price: '$14.50', rating: 4.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3A5zYZpeLe-TUhmkcUB9SteehXmOOfo3OQ&s' },
      {id:143, name: 'Veggie Supreme Pizza', price: '$15.50', rating: 4.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHRrhp5sJzU-mpUf0fSzDAtCAABLsBnNf_8w&s' }
    ]
  },
  {
    id: 15,
    name: 'Adenine',
    rating: 3.8,
    serverCuisine: 'Burger',
    imageUrl: 'logos/2.png',
    menu: [
      {id:151, name: 'Classic Burger', price: '$9.50', rating: 3.9, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeCacsKFVUFTWs2O_nNZ-liKRkUT8eU8zBHQ&s' },
      {id:152, name: 'Onion Ring Burger', price: '$10.50', rating: 3.7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEM4NTPWlku8wxkyfpM6eFM60-1Lb3OgOBQg&s' },
      {id:153, name: 'Spicy Burger', price: '$10.00', rating: 3.8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhUEE4oIKpIVT74lWthSMNKy0xkFz4B-g1w&s' }
    ]
  }
];

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1>Restaurant API</h1>
    <p>Endpoints and what can fetch from them:</p>
    <ul>
      <li><strong>/restaurants</strong> - List all restaurants. Each restaurant includes:
        <ul>
          <li><strong>ID:</strong> Unique identifier of the restaurant.</li>
          <li><strong>Name:</strong> Name of the restaurant.</li>
          <li><strong>Rating:</strong> Rating of the restaurant.</li>
          <li><strong>Server Cuisine:</strong> Type of cuisine served (e.g., Drinks, Pasta, Chicken, Pizza, Burger).</li>
          <li><strong>Image:</strong> Image URL of the restaurant.</li>
        </ul>
      </li>
      <li><strong>/restaurants/:id</strong> - Get details of a specific restaurant by ID. Includes:
        <ul>
          <li>Basic details (ID, Name, Rating, Server Cuisine, Image).</li>
          <li><strong>Menu:</strong> A detailed menu including dish name, price, rating, and image.</li>
        </ul>
      </li>
    </ul>
    <p>To test the API:
      <ul>
        <li>List of all restaurants at: <a href="/restaurants">/restaurants</a></li>
        <li>Details of a specific restaurant at: <a href="/restaurants/1">/restaurants/1</a> (replace <code>1</code> with the desired restaurant ID)</li>
        <li>Menu of a specific restaurant at: <a href="/restaurants/1/menu">/restaurants/1/menu</a> (replace <code>1</code> with the desired restaurant ID)</li>
      </ul>
    </p>
  `);
});

// List all restaurants
app.get('/restaurants', (req, res) => {
    res.json(restaurants.map(({ id, name, rating, serverCuisine, imageUrl }) => ({ id, name, rating, serverCuisine, imageUrl })));
  });
// app.get('/restaurants', (req, res) => {
//   console.log('GET /restaurants called');
//   res.json(restaurants);
// });
  
  // Get restaurant details by ID (including menu)
  app.get('/restaurants/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) {
      return res.status(404).send('Restaurant not found');
    }
  
    res.json(restaurant);
  });
  
  // Get only the menu of a specific restaurant by ID
  app.get('/restaurants/:id/menu', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) {
      return res.status(404).send('Restaurant not found');
    }
  
    res.json({ menu: restaurant.menu });
  });
  
  // Endpoint to get restaurant details by name
  app.get('/restaurant/name/:name', (req, res) => {
    const restaurantName = req.params.name;
    const restaurant = restaurants.find(r => r.name.toLowerCase() === restaurantName.toLowerCase());
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).send('Restaurant not found');
    }
  });


  app.listen(port, () => {
    console.log(`Restaurant API running at http://localhost:${port}`);
  });