const db = require("../db");

const createNote = async (req, res) => {
  try {
    const { note } = req.body;
    const userId = req.user.id;

    const date = new Date().toISOString().split("T")[0];
    const [result] = await db.query(
      "Insert into notes (note, user_id, date) values(?,?,?)",
      [note, userId, date]
    );
    return res.status(201).json({
      message: "Note created successfully",
      noteId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const [notes] = await db.query(
      "SELECT note as Notes ,date,note_id FROM notes WHERE user_id = ?",
      [userId]
    );

    if (notes?.length === 0) {
      return res.status(404).json({ message: "No notes found for this user." });
    }
    res.status(200).json({
      message: "Notes retrieved successfully",
      notes: notes,
    });
  } catch (error) {
    console.error("Error getting notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteNotes = async (req, res) => {
  try {
    const note_id = req.query.id;
    const result = await db.query("DELETE FROM NOTES WHERE note_id =?", [
      note_id,
    ]);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note detele paniyachu da mapla" });
  } catch (error) {
    console.error("Error deleting notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateNotes = async (req, res) => {
  try {
    const { note, note_id } = req.body;
    const userId = req.user.id;
    const result = await db.query(
      "UPDATE notes SET note = ? Where note_id = ? and user_id = ?",
      [note, note_id, userId]
    );
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createNote,
  getNotes,
  deleteNotes,
  updateNotes,
};
