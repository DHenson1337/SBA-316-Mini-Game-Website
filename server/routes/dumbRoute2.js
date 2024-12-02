// localhost:3000/dumb2

const express = require(`express`);
const router = express.Router();
const dumb2 = require("../../data/dummy2");

router.get("/", (req, res) => {
  res.json({ dumb2 });
});

module.exports = router;
