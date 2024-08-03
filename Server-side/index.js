const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const crypto = require("crypto");
// const session = require("express-session");

// const restaurants = require("./restaurants");

const app = express();
app.use(bodyParser.json());
const port = 3000;
const SECRET_KEY =
  "b93347f8048892e99c56ae0ba245736dcd65eb78b61b50b40d2638f51b57239e";

function uuidToNumericId(uuid) {
  const hash = crypto.createHash("md5").update(uuid).digest("hex");
  return parseInt(hash.slice(0, 16), 16);
}

function generateNumericId() {
  const uuid = uuidv4();
  return uuidToNumericId(uuid);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const router = express.Router();
const ownersFilePath = path.join(__dirname, "owners.json");
const restaurantsFilePath = path.join(__dirname, "restaurants.json");
const ordersFilePath = path.join(__dirname, "orders.json");

let users = [];
let pendingRegistrations = [];
let ownerProfiles = [];
let restaurants = [];

// Function to get data from restaurants.json
const getRestaurants = () => {
  const restaurantsData = fs.readFileSync(restaurantsFilePath);
  return JSON.parse(restaurantsData);
};
// Function to save restaurants to restaurants.json
const saveRestaurants = (restaurants) => {
  fs.writeFileSync(restaurantsFilePath, JSON.stringify(restaurants, null, 2));
};

const readJSONFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file ${filename}: ${err.message}`);
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (parseErr) {
          if (parseErr.message.includes("Unexpected end of JSON input")) {
            console.warn(
              `File ${filename} is empty or malformed. Initializing with empty array.`
            );
            resolve([]);
          } else {
            console.error(
              `Error parsing JSON from file ${filename}: ${parseErr.message}`
            );
            reject(parseErr);
          }
        }
      }
    });
  });
};

const writeJSONFile = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data, null, 2), "utf8", (err) => {
      if (err) {
        console.error(`Error writing to file ${filename}: ${err.message}`);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Function to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route to fetch user info
app.get("/user-info", authenticateToken, (req, res) => {
  const { id, role } = req.user;

  let user;
  if (role === "customer") {
    user = users.find((user) => user.id === id);
  } else if (role === "owner") {
    user = ownerProfiles.find((user) => user.id === id);
  } else if (role === "admin") {
    user = users.find((user) => user.id === id);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ username: user.username, role: user.role, user });
});

app.put("/update-user-info", authenticateToken, (req, res) => {
  const { id, role } = req.user;
  const updates = req.body;

  let userIndex;
  let userList;

  if (role === "customer") {
    userList = users;
    userIndex = users.findIndex((user) => user.id === id);
  } else if (role === "owner") {
    userList = ownerProfiles;
    userIndex = ownerProfiles.findIndex((user) => user.id === id);
  } else if (role === "admin") {
    userList = users;
    userIndex = users.findIndex((user) => user.id === id);
  }

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user info
  userList[userIndex] = { ...userList[userIndex], ...updates };

  writeJSONFile("db.json", users);

  res.json({ message: "User updated successfully" });
});

// Endpoint to get current user info
app.get("/current-user", authenticateToken, (req, res) => {
  const user = users.find((user) => user.id === req.user.id);
  if (user) {
    res.json(user);
  } else {
    const owner = ownerProfiles.find((owner) => owner.id === req.user.id);
    if (owner) {
      res.json(owner);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
});

//Endpoint to Get Owner Profile with Restaurants
app.get("/owner-profile", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const owner = ownerProfiles.find(
      (profile) => profile.id === decodedToken.id
    );

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const restaurants = getRestaurants().filter(
      (restaurant) => restaurant.ownerId === owner.id
    );

    res.status(200).json({ ...owner, restaurants });
  } catch (err) {
    console.error("Token verification failed", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

app.put("/owner-profile", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  const { imageUrl } = req.body; // Expecting { imageUrl: "new-image-url" } in the request body

  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const ownerIndex = ownerProfiles.findIndex(
      (profile) => profile.id === decodedToken.id
    );

    if (ownerIndex === -1) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Update the owner profile with the new image URL
    ownerProfiles[ownerIndex].imageUrl = imageUrl;

    // Also, update restaurant profiles if needed
    const updatedRestaurants = getRestaurants().map((restaurant) => {
      if (restaurant.ownerId === ownerProfiles[ownerIndex].id) {
        return { ...restaurant, imageUrl };
      }
      return restaurant;
    });

    restaurants = updatedRestaurants;

    res.status(200).json({ ...ownerProfiles[ownerIndex] });
  } catch (err) {
    console.error("Token verification failed", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

// Load data from files
const loadData = () => {
  try {
    const data = JSON.parse(fs.readFileSync("owners.json", "utf8"));
    pendingRegistrations = data.pendingRegistrations || [];
    ownerProfiles = data.ownerProfiles || [];
    users = JSON.parse(fs.readFileSync("db.json", "utf8")).users || [];
  } catch (err) {
    console.error("Error reading files:", err);
  }
};

// Save data to files
const saveDataToFile = () => {
  try {
    const data = {
      pendingRegistrations,
      ownerProfiles,
    };
    fs.writeFileSync("owners.json", JSON.stringify(data, null, 2));

    // Save user data if needed
    fs.writeFileSync("db.json", JSON.stringify({ users }, null, 2));
  } catch (err) {
    console.error("Error saving data to file:", err);
  }
};

// Load data on server start
loadData();

// Register customer endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password, address, phoneNumber, gender } = req.body;

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = {
    id: generateNumericId(),
    username,
    email,
    password: hashedPassword,
    address,
    phoneNumber,
    gender,
    role: "customer",
  };
  users.push(newUser);
  saveDataToFile();

  res.status(201).json({ message: "User registered successfully" });
});

// Register owner endpoint
app.post("/join-us", async (req, res) => {
  const {
    ownerName,
    restaurantName,
    address,
    phoneNumberOwner,
    phoneNumberRestaurant,
    serverCuisine,
    taxNumber,
    email,
    password,
  } = req.body;

  // Check if owner already exists in pending or approved list
  const existingOwner =
    pendingRegistrations.find((owner) => owner.email === email) ||
    ownerProfiles.find((owner) => owner.email === email);

  if (existingOwner) {
    return res.status(400).json({ message: "Owner already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new owner registration
  const newOwner = {
    id: generateNumericId(),
    ownerName,
    restaurantName,
    address,
    phoneNumberOwner,
    phoneNumberRestaurant,
    serverCuisine,
    taxNumber,
    email,
    password: hashedPassword,
    status: "pending",
    role: "owner",
  };
  pendingRegistrations.push(newOwner);
  saveDataToFile();

  res.status(201).json({ message: "Owner registration submitted" });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check if the user is an owner in pending or approved list
  let user =
    pendingRegistrations.find((user) => user.email === email) ||
    ownerProfiles.find((user) => user.email === email);

  if (user) {
    // User is an owner
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, status: user.status }, // Include role and status
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.json({ token, user });
  }

  // Check if the user is a customer
  user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token, user });
  console.log(email, password);
});

// Endpoint to get pending registrations
app.get("/pending-registrations", (req, res) => {
  try {
    res.json(pendingRegistrations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending registrations" });
  }
});

// Endpoint to approve a registration
app.post("/approve-registration/:id", (req, res) => {
  const { id } = req.params;
  const registrationIndex = pendingRegistrations.findIndex(
    (reg) => reg.id === parseInt(id)
  );

  if (registrationIndex === -1) {
    return res.status(404).json({ message: "Registration not found" });
  }

  // Move registration to approved profiles
  const [approvedRegistration] = pendingRegistrations.splice(
    registrationIndex,
    1
  );
  approvedRegistration.status = "approved";
  ownerProfiles.push(approvedRegistration);

  // Add new restaurant to restaurants.json
  const restaurants = getRestaurants();
  const newRestaurant = {
    id: generateNumericId(),
    ownerId: approvedRegistration.id,
    name: approvedRegistration.restaurantName,
    rating: 4.5,
    serverCuisine: approvedRegistration.serverCuisine,
    imageUrl: "",
    menu: [],
  };
  restaurants.push(newRestaurant);
  saveRestaurants(restaurants);

  saveDataToFile();

  res.status(200).json({ message: "Registration approved successfully" });
});

// List all restaurants
app.get("/restaurants", (req, res) => {
  const restaurants = getRestaurants();
  res.json(
    restaurants.map(({ id, name, rating, serverCuisine, imageUrl }) => ({
      id,
      name,
      rating,
      serverCuisine,
      imageUrl,
    }))
  );
});

// Get restaurant details by ID (including menu)
app.get("/restaurants/:id", (req, res) => {
  const restaurant = restaurants.find((r) => r.id === parseInt(req.params.id));
  if (!restaurant) {
    return res.status(404).send("Restaurant not found");
  }

  res.json(restaurant);
});

// Get only the menu of a specific restaurant by ID
app.get("/restaurants/:id/menu", (req, res) => {
  const restaurant = restaurants.find((r) => r.id === parseInt(req.params.id));
  if (!restaurant) {
    return res.status(404).send("Restaurant not found");
  }

  res.json({ menu: restaurant.menu });
});

// Endpoint to get restaurant details by name
app.get("/restaurant/name/:name", (req, res) => {
  const restaurantName = req.params.name;
  const restaurant = restaurants.find(
    (r) => r.name.toLowerCase() === restaurantName.toLowerCase()
  );
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});

const loadDataFromFile = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "restaurants.json"));
    restaurants = JSON.parse(data);
  } catch (error) {
    console.error("Error reading restaurants data file:", error.message);
  }
};

loadDataFromFile();
// Endpoint to add a menu item
app.post("/restaurants/:id/menu", authenticateToken, async (req, res) => {
  const restaurantId = parseInt(req.params.id);
  const { name, price, rating, image } = req.body;

  // Check if required fields are present
  if (!name || price === undefined || rating === undefined) {
    return res
      .status(400)
      .json({ message: "Name, price, and rating are required" });
  }

  // Ensure rating is a number and price is a string
  if (isNaN(rating)) {
    return res.status(400).json({ message: "Rating must be a number" });
  }

  try {
    const data = await fs.promises.readFile(restaurantsFilePath, "utf8");
    let restaurants = JSON.parse(data);

    const restaurant = restaurants.find((r) => r.id === restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const newMenuItem = {
      id: generateNumericId(),
      name,
      price,
      rating: parseFloat(rating),
      image,
    };

    restaurant.menu.push(newMenuItem);

    await fs.promises.writeFile(
      restaurantsFilePath,
      JSON.stringify(restaurants, null, 2)
    );

    res.status(201).json(newMenuItem);
  } catch (err) {
    console.error("Error handling request:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT Endpoint to update a menu item
app.put("/restaurants/:restaurantId/menu/:itemId", (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId);
  const menuItemId = parseInt(req.params.itemId);
  const { name, price, rating, image } = req.body;

  fs.readFile(restaurantsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading restaurants file:", err);
      return res
        .status(500)
        .json({ message: "Error reading restaurants file" });
    }

    const restaurants = JSON.parse(data);
    const restaurant = restaurants.find((r) => r.id === parseInt(restaurantId));

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItem = restaurant.menu.find((m) => m.id === parseInt(menuItemId));

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    menuItem.name = name || menuItem.name;
    menuItem.price = price || menuItem.price;
    menuItem.rating = rating || menuItem.rating;
    menuItem.image = image || menuItem.image;

    fs.writeFile(
      restaurantsFilePath,
      JSON.stringify(restaurants, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing restaurants file:", err);
          return res
            .status(500)
            .json({ message: "Error writing restaurants file" });
        }

        res.json(menuItem);
      }
    );
  });
});

// DELETE Endpoint to delete a menu item
app.delete("/restaurants/:restaurantId/menu/:itemId", (req, res) => {
  const restaurantId = parseInt(req.params.restaurantId);
  const menuItemId = parseInt(req.params.itemId);

  fs.readFile(restaurantsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading restaurants file:", err);
      return res
        .status(500)
        .json({ message: "Error reading restaurants file" });
    }

    const restaurants = JSON.parse(data);
    const restaurant = restaurants.find((r) => r.id === restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItemIndex = restaurant.menu.findIndex((m) => m.id === menuItemId);

    if (menuItemIndex === -1) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    restaurant.menu.splice(menuItemIndex, 1);

    fs.writeFile(
      restaurantsFilePath,
      JSON.stringify(restaurants, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing restaurants file:", err);
          return res
            .status(500)
            .json({ message: "Error writing restaurants file" });
        }

        res.status(204).end();
      }
    );
  });
});

// Update the restaurant imageUrl (logo)
app.put("/restaurants/:restaurantId/logo", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const { restaurantId } = req.params;
    const { logoUrl } = req.body;

    let restaurants = getRestaurants();
    const restaurant = restaurants.find((r) => r.id === parseInt(restaurantId));

    if (!restaurant) {
      console.log(`Restaurant not found for ID: ${restaurantId}`);
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.imageUrl = logoUrl;
    saveRestaurants(restaurants);

    console.log(`Logo updated for restaurant ID: ${restaurantId}`);

    res.status(200).json({ message: "Logo updated successfully" });
  } catch (err) {
    console.error("Token verification failed", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

// Route to get an order by ID
app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const orders = await readJSONFile(ordersFilePath);

    // console.log("Orders:", orders); // Debugging output

    if (!Array.isArray(orders)) {
      console.error("Orders is not an array:", orders); // Debugging output
      return res.status(500).json({ message: "Orders data is not an array" });
    }

    const orderId = parseInt(req.params.orderId, 10);
    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = orders.find((o) => o.id === orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const orders = await readJSONFile(ordersFilePath);

    // console.log("Orders before adding new order:", orders); // Debugging output

    if (!Array.isArray(orders)) {
      return res.status(500).json({ message: "Orders data is not an array" });
    }

    const newOrder = {
      id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
      ...req.body,
      status: "preparing order",
      orderTime: new Date().toISOString(),
    };

    orders.push(newOrder);
    await writeJSONFile(ordersFilePath, orders);

    // console.log("Orders after adding new order:", orders); // Debugging output

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

app.put("/api/orders/:orderId/status", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "preparing order",
      "ready for pickup",
      "out for delivery",
      "delivered",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const orders = await readJSONFile(ordersFilePath);
    const orderId = parseInt(req.params.orderId, 10);

    if (isNaN(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const orderIndex = orders.findIndex((o) => o.id === orderId);
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      await writeJSONFile(ordersFilePath, orders);
      res.json(orders[orderIndex]);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
