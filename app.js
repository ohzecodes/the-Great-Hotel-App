let express = require("express");
let app = express();
var fs = require("fs");
var mongoose = require("mongoose");
app.use(express.json()); // this is important for req.body

const connection = require("./db/connection");
const hotelS = require("./models/hotel");
const reviewS = require("./models/reviews");
app.use(express.static("public"));
let m = require(__dirname + "/validators.js");
const { validationResult } = require("express-validator");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

app.get("/", (req, res) => {
  if (mongoerror == undefined) res.status(200).send("./public/index.html");
  else {
    res.status(400).send("mongoerror");
  }
});
require("./extraroutes")(app, hotelS);
app.get("/api/all", (req, res) => {
  hotelS.find().then(() => {
    hotelS
      .aggregate([
        {
          $lookup: {
            from: "reviews",
            localField: "rev",
            foreignField: "_id",
            as: "rev",
          },
        },
      ])
      .then((r) => res.status(200).send(r))
      .catch((e) => res.status(400).send(e));
  });
});

app.post("/images", upload.single("hotelImg"), (req, res) => {
  res.status(200).send(req.file);
});

app.post("/add/hotels", m.form1, (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    let hotel = new hotelS(req.body);
    hotel
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => res.status(400).send(error));
  } else {
    res.status(400).send(errors);
  }
});

app.post("/add/reviews", m.form2, (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (errors.isEmpty()) {
    let review = new reviewS(req.body);

    review
      .save()
      .then((result) => {
        console.log("id", result._id);
        hotelS
          .findOne({ name: req.body.name })
          .then((res) => {
            let p = res.rev.slice(0);
            p.push(result._id);
            console.log(p);

            hotelS
              .findOneAndUpdate({ name: req.body.name }, { rev: p })
              .then(console.log("sucess"))
              .catch((e) => console.log(e));
          })
          .then((result) => {
            hotelS
              .aggregate([
                {
                  $lookup: {
                    from: "reviews",
                    localField: "rev",
                    foreignField: "_id",
                    as: "rev",
                  },
                },
              ])
              .then((result) => {
                console.log(result);
                res.status(200).send(result);
              })
              .catch((err) => {});
          });
      })
      .catch((error) => {
        res.status(400).send(error);
        console.log(error);
      });
  } else {
    res.status(400).send(errors);
  }
});

connection
  .once("open", () => {
    app.set("port", process.env.PORT || 8080);
    let server = app.listen(app.settings.port, () => {
      console.log("Server ready on ", app.settings.port);
    });
  })
  .catch((err) => {});

// https://youtu.be/srPXMt1Q0nY?t=1007
