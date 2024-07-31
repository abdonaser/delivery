const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const session = require("express-session");

const restaurants = require("./restaurants");

const app = express();
const port = 3000;
const SECRET_KEY =
  "b93347f8048892e99c56ae0ba245736dcd65eb78b61b50b40d2638f51b57239e";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

let users = [];
let pendingRegistrations = [];
let ownerProfiles = [];

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
    fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
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

// Route to get owner profile
app.get("/owner-profile", authenticateToken, (req, res) => {
  // Simulated database query
  const ownerProfile = ownerProfiles.find(
    (profile) => profile.id === req.user.id
  );

  if (ownerProfile) {
    res.json(ownerProfile);
  } else {
    res.status(404).json({ message: "Profile not found" });
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
    id: uuidv4(),
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
    category,
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
    id: uuidv4(),
    ownerName,
    restaurantName,
    address,
    phoneNumberOwner,
    phoneNumberRestaurant,
    category,
    taxNumber,
    email,
    password: hashedPassword,
    status: "pending",
    role: "owner", // Ensure role is set to "owner"
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
    (reg) => reg.id === id
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

  saveDataToFile();

  res.status(200).json({ message: "Registration approved successfully" });
});

// List all restaurants
app.get("/restaurants", (req, res) => {
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

// const generateUniqueId = () => {
//   return uuidv4();
// };

const loadDataFromFile = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "restaurants.json"));
    restaurants = JSON.parse(data);
  } catch (error) {
    console.error("Error reading restaurants data file:", error.message);
  }
};

app.post("/restaurants", authenticateToken, (req, res) => {
  const { name, rating, serverCuisine, imageUrl, menu } = req.body;

  console.log("Received data:", req.body);

  // Validate required fields
  if (!name || !rating || !serverCuisine || !imageUrl || !Array.isArray(menu)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate menu items
  for (const item of menu) {
    if (
      !item.id ||
      !item.name ||
      typeof item.price !== "string" ||
      typeof item.rating !== "number" ||
      !item.image
    ) {
      return res.status(400).json({ message: "Invalid menu item data" });
    }
  }

  const newRestaurant = {
    id: uuidv4(),
    name,
    rating,
    serverCuisine,
    imageUrl,
    menu,
  };

  const existingRestaurantIndex = restaurants.findIndex((r) => r.name === name);

  if (existingRestaurantIndex >= 0) {
    // Update existing restaurant
    restaurants[existingRestaurantIndex] = {
      ...restaurants[existingRestaurantIndex],
      ...newRestaurant,
    };
  } else {
    // Add new restaurant
    restaurants.push(newRestaurant);
  }

  saveDataToFile();
  res.status(201).json(newRestaurant);
});

loadDataFromFile();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
