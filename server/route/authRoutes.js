const express = require("express");
const {
  register,
  login,
  getCurrentUser,
  uploadProfileImage,
} = require("../controller/authController");
const upload = require("../middleware/fileupload");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/register", upload.single("profile_image"), register);
router.post("/login", login);
router.get("/me", auth, getCurrentUser);
router.post(
  "/upload-profile-image",
  auth,
  upload.single("profile_image"),
  uploadProfileImage
);

module.exports = router;
