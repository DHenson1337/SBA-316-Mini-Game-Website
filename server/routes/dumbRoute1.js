// localhost:3000/dumb
//http://localhost:3000/dumb?icecream=Vanilla
//http://localhost:3000/dumb?size=tiny
const express = require("express");
const router = express.Router();
const { dumb1 } = require("../../data/dummy1");

router.get("/", (req, res) => {
  const { icecream, size } = req.query;

  // Initialize filteredData with the full dataset
  let filteredData = dumb1;

  // Apply filters if query parameters are present
  if (icecream) {
    filteredData = filteredData.filter((item) =>
      item.icecream.toLowerCase().includes(icecream.toLowerCase())
    );
  }

  if (size) {
    filteredData = filteredData.filter((item) =>
      item.size.toLowerCase().includes(size.toLowerCase())
    );
  }

  res.json(filteredData); // Respond with the filtered dataset
});

module.exports = router;
