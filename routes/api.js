const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/keys");

const router = new express.Router();

//@route GET /api/test
//@desc test route
//@access public
router.get("/test", (req, res) => {
  return res.status(200).json({ ok: true });
});

//@route GET /api/words
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

//@route POST /api/users
//@desc create new user
//@access public
router.post("/users", (req, res) => {
  fs.readFile("./users.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed: ", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
    if (!req.body.name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!req.body.won == 0 && !req.body.won == 1) {
      return res.status(400).json({ error: "Data is required" });
    }
    const userData = JSON.parse(jsonString);
    for (let key in userData) {
      if (userData[key].name === req.body.name) {
        return res.status(400).json({ error: "Name taken" });
      }
    }
    jwt.sign({ name: req.bodyname }, secret, (err, token) => {
      if (err) {
        console.log("Jwt error: ", err);
        return res.status(500).json({ error: "Something went wron" });
      }

      userData[token] = {
        name: req.body.name,
        played: 1,
        won: Number(req.body.won),
        lost: 1 - req.body.won,
        winrate: Number(req.body.won)
      };

      fs.writeFile("./users.json", JSON.stringify(userData), err => {
        if (err) {
          console.log("File write error: ", err);
          return res.status(500).json({ error: "Something went wron" });
        }
        return res.status(200).json({ token });
      });
    });
  });
});

//@route POST /api/record
//@desc update stats after a game
//@access public
router.post("/record", (req, res) => {
  const { token, won } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }
  if (!won == 0 && !won == 1) {
    return res.status(400).json({ error: "Data is required" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token incorrect" });
    }
    fs.readFile("./users.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed: ", err);
        return res.status(500).json({ error: "Something went wrong" });
      }
      const data = JSON.parse(jsonString);
      if (!data[token]) {
        return res.status(404).json({ error: "User not found" });
      }
      const newData = { ...data[token] };
      newData.played += 1;
      if (won == 1) {
        newData.won += 1;
      } else {
        newData.lost += 1;
      }
      newData.winrate = newData.won / newData.played;
      data[token] = newData;

      fs.writeFile("./users.json", JSON.stringify(data), err => {
        if (err) {
          console.log("File write error: ", err);
          return res.status(500).json({ error: "Something went wron" });
        }
        return res.status(200).json({ success: true });
      });
    });
  });
});

//@route POST /api/words
//@desc verify token
//@access public
router.post("/verify", (req, res) => {
  const { token, won } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token incorrect" });
    }
    return res.status(200).json({ token });
  });
});

//@route GET /api/words
//@desc get stats
//@access public
router.get("/stats", (req, res) => {
  fs.readFile("./users.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed: ", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
    const data = JSON.parse(jsonString);
    const usersList = [];
    for (let key in data) {
      usersList.push(data[key]);
    }
    const payload = usersList
      .sort((a, b) => {
        if (a["played"] < b["played"]) {
          return 1;
        }
        if (a["played"] > b["played"]) {
          return -1;
        }
        return 0;
      })
      .slice(0, 10);
    console.log(payload);
    return res.status(200).json({ payload });
  });
});

module.exports = router;
