const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createNote,
  getNotes,
  deleteNotes,
  updateNotes,
} = require("../controller/notesController");

router.post("/", auth, createNote);
router.get("/", auth, getNotes);
router.delete("/", auth, deleteNotes);
router.put("/", auth, updateNotes);

module.exports = router;
