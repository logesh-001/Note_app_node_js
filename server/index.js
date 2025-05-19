const express = require("express");
require("dotenv").config();
const db = require("./db");
const authRoutes = require("./route/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.json()); // Add this to parse JSON
app.use(cookieParser()); // Add this to parse cookies

app.use("/api/auth", authRoutes); // ✅ using the router

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Vanakam da mapla ${port} la irundhu`);
});
