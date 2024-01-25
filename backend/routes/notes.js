const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/getUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//route 1 get all notes
try {
  router.get("/fetchallnotes", fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  });
} catch (error) {
  console.log(error.message);
  res.status(500).send("internal error boiii");
}

//route 2 add notes
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "enter valid title").isLength({ min: 3 }),
    body("description", "must be atleast 5 characs").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal error boiii");
    }
  }
);
//route 3 update note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal error boiii");
  }
});
//route 4 delete  note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: ":deleted successfully", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal error boiii");
  }
});

module.exports = router;
