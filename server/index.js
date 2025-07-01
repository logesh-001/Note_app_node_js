const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const authRoutes = require("./route/authRoutes");
const notesRoutes = require("./route/notesRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ allow React dev server
    credentials: true, // if you're using cookies or auth headers
  })
);
// middleware
app.use(express.json()); // Add this to parse JSON
app.use(cookieParser()); // Add this to parse cookies
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//Routes
app.use("/api/auth", authRoutes); //  using the Auth router
app.use("/api/notes", notesRoutes); //  using the Note router

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Vanakam da mapla ${port} la irundhu`);
});
