//imports
const cors = require("cors");
const bodyParser = require("body-parser");

//initialize app
const app = require("express")();

//apply middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//@route /
//@desc test route
//@access public
app.get("/", (req, res) => {
  res.status(200).json({ ok: true });
});

//initialize port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
