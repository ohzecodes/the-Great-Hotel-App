let express = require("express");
let app = express();
var fs = require("fs");
var mongoose = require("mongoose");
app.use(express.json());

app.set("view engine", "ejs");
const connection = require("./db/connection");
const hotelS = require("./models/hotel");
const reviewS = require("./models/reviews");

app.use(express.static("public"));
app.use("/api", require("./extraroutes.js"));
app.use("/add", require("./addroute.js"));

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
    fileSize: 1024 * 1024 * 2,
  },
});

app.get("/", (req, res) => {
  res.status(200).send("./public/index.html");
});

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
      .then((r) => {
        // checks if image not in the server sets filepath of object to false, __v to 1, indicating that the hotel has been changed
        const refinedobj = r.map((e) => {
          const fp = e.filepath.split("/");
          fp[fp.length - 1] = encodeURIComponent(fp[fp.length - 1]);

          if (!fs.existsSync(e.filepath)) {
            return { ...e, filepath: false, __v: 1 };
          } else {
            e.filepath = fp.join("/");
            return e;
          }
        });

        res.status(200).send(refinedobj);
      })
      .catch((e) => res.status(400).send(e));
  });
});

app.post("/images", upload.single("hotelImg"), (req, res) => {
  res.status(200).send(req.file);
});

app.use((error, req, res, next) => {
  console.log("This is the rejected field ->", error.field);
});

app.get("/:city/:hotel", (req, res) => {
  const city = req.params.city;
  const hotel = req.params.hotel;

  hotelS
    .findOne({ city: city, name: hotel })
    .populate({ path: "rev" })
    .then((e) => {
      const array1 = e.filepath.split("/");

      e.host = req.headers.host;
      array1.shift();
      array1[array1.length - 1] = encodeURIComponent(array1[array1.length - 1]);

      e.filepath = array1.join("/");

      e.avgrating =
        e.rev.map((m) => m.rating).reduce((prev, c) => prev + c, 0) /
        e.rev.length;

      res.render("onehotel", e);
    })
    .catch((e) => res.send("not found"));
});

app.get("*", (req, res) => {
  res.status(404).send("404 error");
});

try {
  connection.once("open", () => {
    app.set("port", process.env.PORT || 8080);
    let server = app.listen(app.settings.port, () => {
      console.log("Server ready on ", app.settings.port);
    });
  });
} catch (e) {
  console.log(e);
}

// https://youtu.be/srPXMt1Q0nY?t=1007
