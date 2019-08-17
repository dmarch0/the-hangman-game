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
    const { min, max, token } = req.query;
    if (!min || !max) {
      return res.status(400).json({ error: "Min and max are required" });
    }
    const words = JSON.parse(jsonString);
    if (!words[min] || !words[max]) {
      return res.status(400).json({ error: "Restrictions don't match" });
    }
    fs.readFile("./users.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed: ", err);
        return res.status(500).json({ error: "Something went wrong" });
      }
      const data = JSON.parse(jsonString);
      if (token) {
        //user has a token
        if (!data[token]) {
          return res.status(404).json({ error: "User not found" });
        }
        if (data[token].game) {
          //if there is a game, send current game state
          const game = data[token].game;
          const payload = {
            currentState: game.currentState,
            livesLeft: game.livesLeft,
            alreadyGuessedLetters: game.alreadyGuessedLetters,
            user: "logged",
            status: "in progress"
          };
          return res.status(200).json(payload);
        } else {
          //if no game, create new game
          const wordLength = Math.floor(
            Math.random() * (max - min) + Number(min)
          );
          const wordsOfLength = words[String(wordLength)];
          const word =
            wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)];
          const newGame = {
            word: word.toUpperCase(),
            wordByLetters: word.toUpperCase().split(""),
            currentState: word.split("").map(letter => "_"),
            alreadyGuessedLetters: {},
            livesLeft: 10
          };
          data[token].game = newGame;
          fs.writeFile("./users.json", JSON.stringify(data), err => {
            if (err) {
              console.log("File write error: ", err);
              return res.status(500).json({ error: "Something went wron" });
            }
            return res.status(200).json({
              currentState: newGame.currentState,
              alreadyGuessedLetters: newGame.alreadyGuessedLetters,
              livesLeft: newGame.livesLeft,
              user: "logged",
              status: "in progress"
            });
          });
        }
      } else {
        //user is not logged in
        //create temp game, send him the token

        const wordLength =
          Math.floor(Math.random() * (max - min)) + Number(min);
        const wordsOfLength = words[String(wordLength)];
        const word =
          wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)];
        const newGame = {
          word: word.toUpperCase(),
          wordByLetters: word.toUpperCase().split(""),
          currentState: word.split("").map(letter => "_"),
          alreadyGuessedLetters: {},
          livesLeft: 10
        };
        const payload = {
          currentState: newGame.currentState,
          alreadyGuessedLetters: newGame.alreadyGuessedLetters,
          livesLeft: newGame.livesLeft,
          user: "temp",
          status: "in progress"
        };
        jwt.sign(payload, secret, (err, token) => {
          if (err) {
            console.log("Jwt error: ", err);
            return res.status(500).json({ error: "Something went wron" });
          }
          data.temp[token] = newGame;
          fs.writeFile("./users.json", JSON.stringify(data), err => {
            if (err) {
              console.log("File write error: ", err);
              return res.status(500).json({ error: "Something went wron" });
            }
            payload.token = token;
            return res.status(200).json(payload);
          });
        });
      }
    });
  });
});

//@route POST /api/try
//@desc try a letter
//@access public
router.post("/try", (req, res) => {
  const { user, token } = req.body;
  let letter = req.body.letter;
  if (!letter) {
    return res.status(400).json({ error: "Letter is required" });
  }
  if (letter.length > 1) {
    return res.status(400).json({ error: "Letter must be sinle" });
  }
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }
  if (!user) {
    return res.status(400).json({ error: "User status is required" });
  }
  if (!(user === "temp" || user === "logged")) {
    return res.status(400).json({ error: "User status incorrect" });
  }
  fs.readFile("./users.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed: ", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
    const data = JSON.parse(jsonString);
    letter = letter.toUpperCase();
    let gameData = {};
    if (user === "temp") {
      gameData = { ...data["temp"][token] };
    } else {
      if (!data[token]) {
        return res.status(400).json({ error: "User not found" });
      } else {
        gameData = { ...data[token].game };
      }
    }
    if (Object.keys(gameData).length === 0) {
      return res.status(400).json({
        error:
          "Game not found, either token is incorrect or you have to start the game first"
      });
    }
    if (Object.keys(gameData.alreadyGuessedLetters).includes(letter)) {
      const payload = {
        currentState: gameData.currentState,
        alreadyGuessedLetters: gameData.alreadyGuessedLetters,
        livesLeft: gameData.livesLeft,
        status: "in progress"
      };
      return res.json(payload);
    }
    if (gameData.wordByLetters.includes(letter)) {
      gameData.alreadyGuessedLetters[letter] = "succeed";
      gameData.currentState = gameData.currentState.map(
        (mappedLetter, index) => {
          return gameData.wordByLetters[index] === letter
            ? letter
            : mappedLetter;
        }
      );
      //Check win condition
      if (!gameData.currentState.includes("_")) {
        if (user === "temp") {
          delete data["temp"][token];
        } else {
          delete data[token].game;
          data[token].played += 1;
          data[token].won += 1;
          data[token].winrate = data[token].won / data[token].played;
        }
        fs.writeFile("./users.json", JSON.stringify(data), err => {
          if (err) {
            console.log("File write error: ", err);
            return res.status(500).json({ error: "Something went wron" });
          }
          return res.status(200).json({
            status: "won",
            currentState: gameData.currentState,
            livesLeft: gameData.livesLeft
          });
        });
      } else {
        const payload = {
          currentState: gameData.currentState,
          alreadyGuessedLetters: gameData.alreadyGuessedLetters,
          livesLeft: gameData.livesLeft,
          status: "in progress"
        };
        if (user === "temp") {
          data["temp"][token] = gameData;
        } else {
          data[token].game = gameData;
        }
        fs.writeFile("./users.json", JSON.stringify(data), err => {
          if (err) {
            console.log("File write error: ", err);
            return res.status(500).json({ error: "Something went wron" });
          }
          return res.status(200).json(payload);
        });
      }
    } else {
      gameData.livesLeft -= 1;
      gameData.alreadyGuessedLetters[letter] = "failed";
      //Check loss condition
      if (gameData.livesLeft <= 0) {
        if (user === "temp") {
          delete data["temp"][token];
        } else {
          delete data[token].game;
          data[token].played += 1;
          data[token].lost += 1;
          data[token].winrate = data[token].won / data[token].played;
        }
        fs.writeFile("./users.json", JSON.stringify(data), err => {
          if (err) {
            console.log("File write error: ", err);
            return res.status(500).json({ error: "Something went wron" });
          }
          return res
            .status(200)
            .json({
              status: "lost",
              currentState: gameData.currentState,
              livesLeft: gameData.livesLeft
            });
        });
      } else {
        if (user === "temp") {
          data["temp"][token] = gameData;
        } else {
          data[token].game = gameData;
        }
        const payload = {
          currentState: gameData.currentState,
          alreadyGuessedLetters: gameData.alreadyGuessedLetters,
          livesLeft: gameData.livesLeft,
          status: "in progress"
        };
        fs.writeFile("./users.json", JSON.stringify(data), err => {
          if (err) {
            console.log("File write error: ", err);
            return res.status(500).json({ error: "Something went wron" });
          }
          return res.status(200).json(payload);
        });
      }
    }
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
