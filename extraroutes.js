const express = require("express");
let router = express.Router();
const hotelS = require("./models/hotel");
const reviewS = require("./models/reviews");

router.get("/city/:cities", (req, res) => {
  hotelS
    .find({ city: req.params.cities })
    .populate({ path: "rev" })
    .then((r) => res.status(200).send(r))
    .catch((c) => res.status(400).send(c));
});

router.get("/city/:cities/hotel/:hotel", (req, res) => {
  hotelS
    .findOne({
      city: req.params.cities,
      name: req.params.hotel,
    })
    .populate({ path: "rev" })
    .then((r) => res.status(200).send(r))
    .catch((c) => res.status(400).send(c));
});

router.get("/", (req, res, next) => {
  next();
});

module.exports = router;
