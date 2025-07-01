const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { get } = require("../route/authRoutes");

const register = async (req, res) => {
  try {
    const { username, email, password, contact } = req.body;
    const profile_image = null;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    // Check if user already exists
    const [existingUserRows] = await db.query(
      "SELECT * FROM user WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUserRows.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const sql =
      "INSERT INTO user (username, email, password, contact, profile_image) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [
      username,
      email,
      hashedPassword,
      contact || null,
      profile_image,
    ]);

    res.status(200).json({ message: "Registration successful!" });
    console.log(username, email, contact);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const [userRows] = await db.query(
      "SELECT * FROM user WHERE email = ? or username = ?",
      [email, email]
    );
    if (userRows.length === 0) {
      return res.status(400).json({ message: "User not found!" });
    }
    const isMatched = await bcrypt.compare(password, userRows[0].password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid password!" });
    }
    const token = jwt.sign({ id: userRows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log("Jwt token:", token);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
    });
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: userRows[0].id,
        username: userRows[0].username,
        email: userRows[0].email,
        contact: userRows[0].contact,
        profile_image: userRows[0].profile_image,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const [userRows] = await db.query("SELECT * FROM user WHERE id = ?", [
      userId,
    ]);
    if (userRows.length === 0) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(userRows[0]);
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Updating profile image
const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile_image = req.file.path
      ? `/uploads/${req.file.filename}`
      : null;

    const [result] = await db.query(
      "update user set profile_image=? where id=?",
      [profile_image, userId]
    );
    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "user not found!" });
    }
    res.status(200).json({
      message: "Profile image uploaded successfully!",
      profile_image,
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  uploadProfileImage,
};
