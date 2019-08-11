const express = require("express");
const fs = require("fs");

const router = new express.Router();

//@route /api/test
//@desc test route
//@access public
router.get("/test", (req, res) => {
  return res.status(200).json({ ok: true });
});

//@route /api/words
//@desc get words
//@access public
router.get("/words", (req, res) => {
  fs.readFile("../words.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed: ", err);
      return;
    }
    const { min, max } = req.body;
    if (!min || !max) {
      return res.status(400).json({ error: "Min and max are required" });
    }
    const words = JSON.parse(jsonString);
    if (!words[req.body.min] || !words[req.body.max]) {
      return res.status(400).json({ error: "Restrictions don't match" });
    }
    const payload = [];
    for (let key in words) {
      if (key >= req.body.min && key <= req.body.max) {
        payload.concat(words[key]);
      }
    }
    return res.status(200).json({ payload });
  });
});

module.exports = router;
