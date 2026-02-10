const Note = require("../models/note");
const crypto = require("crypto");
const { generateSummary } = require("../services/geminiService");
const mongoose = require("mongoose");

exports.createnote = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.trim() === "") {
            return res.status(400).json({
                error: "Note text cannot be empty"
            });
        }
        if (text.length > 500) {
            return res.status(400).json({
                error: "Note text cannot exceed 500 characters"
            })
        }

        const password = crypto.randomBytes(4).toString("hex"); // Generate a random 8-character password,becuse iuuid is a 32 bit string and we only need 8 characters for the password

        const note = await Note.create({
            text,
            password
        });

        res.status(201).json({
            noteId: note._id,
            password
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });

    }
};


exports.unlocknote = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;



        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid note ID" });
        }

        const note = await Note.findById(id);

        //note not found
        if (!note) {
            return res.status(400).json({ error: "Note not found!" });
        }

        //incorrect password
        if (note.password !== password) {
            return res.status(400).json({ error: "Incorrect password!" });
        }

        res.status(200).json({
            text: note.text,
            aiSummary: note.aiSummary // this will also send the ai note summary.
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// POST /api/notes/:id/summarize
exports.summarizeNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // return cached summary if exists
        if (note.aiSummary && note.aiSummary.length > 0) {
            return res.status(200).json({ summary: note.aiSummary });
        }

        const summary = await generateSummary(note.text);

        if (!summary) {
            return res.status(500).json({
                error: "Failed to generate summary"
            });
        }

        note.aiSummary = summary;
        await note.save();

        res.status(200).json({ summary });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
