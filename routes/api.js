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
  fs.readFile("./words.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed: ", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
    const { min, max } = req.query;
    if (!min || !max) {
      return res.status(400).json({ error: "Min and max are required" });
    }
    const words = JSON.parse(jsonString);
    if (!words[min] || !words[max]) {
      return res.status(400).json({ error: "Restrictions don't match" });
    }
    let payload = [];
    for (let key in words) {
      if (key >= min && key <= max) {
        payload = payload.concat(words[key]);
      }
    }
    return res.status(200).json({ payload });
  });
});

module.exports = router;
