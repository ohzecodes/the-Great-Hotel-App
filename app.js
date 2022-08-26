let express = require("express");
let app = express();
var fs = require("fs");

var mongoose = require("mongoose");
app.use(express.json());
const path = require("path");

app.set("view engine", "ejs");
const connection = require("./db/connection");
const hotelS = require("./models/hotel");
const reviewS = require("./models/reviews");

app.use(express.static("public"));
app.use("/api", require("./extraroutes.js"));
app.use("/add", require("./addroute.js"));

const multer = require("multer");
const errorHandler = require("./auth/middleware/error");
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

app.get("/show/:city", (req, res) => {
  const { city } = req.params;

  hotelS
    .find({ city: city })
    .populate({ path: "rev" })
    .then((e) => {
      e.forEach((e) => {
        if (!fs.existsSync(e.filepath)) {
          e.filepath = "//" + `${req.headers.host}/uploads/placeholder.png`;
          e.__v = 1;
        } else {
          e.filepath =
            "//" +
            req.headers.host +
            "/" +
            e.filepath.split("/").splice(1).join("/");
        }

        e.avgrating =
          e.rev.map((m) => m.rating).reduce((prev, c) => prev + c, 0) /
          e.rev.length;
      });
      console.log(e[0].rev.length);
      res.render("city", { hotel: e, host: req.headers.host });
    })
    .catch((e) => {
      console.log(e);
      res.send("city not found");
    });
});
app.get("/show/:city/:hotel", (req, res) => {
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
      // if (!fs.existsSync(e.filepath)) {
      //   return { ...e, filepath: false, __v: 1 };
      // } else {
      //   e.filepath = fp.join("/");
      //   return e;
      // }
      e.filepath = array1.join("/");

      e.avgrating =
        e.rev.map((m) => m.rating).reduce((prev, c) => prev + c, 0) /
        e.rev.length;

      res.render("onehotel", e);
    })
    .catch((e) => res.send(" hotel not found"));
});

// Connecting auth Routes
app.use("/api/auth", require("./auth/auth"));
app.use("/api/private", require("./auth/private"));

app.use((error, req, res, next) => {
  console.log("This is the rejected field ->", error);
});
app.get("/*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "/public/index.html"));
});
app.use(errorHandler);

try {
  connection.once("open", () => {
    // console.log(process.env);
    app.set("port", process.env.PORT || 8080);
    let server = app.listen(app.settings.port, () => {
      console.log("Server ready on ", app.settings.port);
    });
  });
} catch (e) {
  console.log(e);
}

// https://youtu.be/srPXMt1Q0nY?t=1007
