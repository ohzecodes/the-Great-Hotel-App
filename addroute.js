const express = require("express");
let router = express.Router();
const hotelS = require("./models/hotel");
const reviewS = require("./models/reviews");
const { validationResult } = require("express-validator");
let m = require("./validators.js");

router.post("/hotels", m.form1, (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);
  // console.log(errors);
  if (errors.isEmpty()) {
    new hotelS({ ...req.body })
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(402).send(err);
      });
  } else {
    console.log(errors);
    res.status(400).send(errors);
  }
});

router.post("/reviews", m.form2, async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      let review = new reviewS(req.body);
      const ReviewSaveResult = await review.save();
      const prev = await hotelS.findOne({ name: req.body.name });
      let rev = [...prev.rev, ReviewSaveResult._id];

      await hotelS.updateOne({ name: req.body.name }, { rev: rev });
      await hotelS.findOne({ name: req.body.name });
      res.status(200).send(ReviewSaveResult);
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(400).send(errors);
  }
  /*  
  review
      .save()
      .then((result) => {
        hotelS.findOne({ name: req.body.name }).then((res) => {
          let p = [...res.rev, result._id];

          hotelS
            .findOneAndUpdate({ name: req.body.name }, { rev: p })
            .then((res) => {
              console.log(42, res);
            })
            .catch((e) => console.log(e));
        });
      })
      .catch((error) => {
        res.status(400).send(error);
        console.log(error);
      });
  } else {
    res.status(400).send(errors);
 } 
 
 */
});

module.exports = router;
