const express = require('express');
const { createnote, unlocknote, summarizeNote } = require("../controllers/noteController");

const router = express.Router();

router.post("/create", createnote);
router.post("/:id/unlock", unlocknote);
router.get("/:id/summarize", summarizeNote);

module.exports = router;