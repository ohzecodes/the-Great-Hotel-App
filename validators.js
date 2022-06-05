let express = require("express");
let app = express();
let valid = require("validator");
const { check } = require("express-validator");
var exports = (module.exports = {});
app.use(express.urlencoded({ extended: true }));

exports.form1 = [
  check("name")
    .trim()
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .escape()
    .customSanitizer((string) => string.toLowerCase()),

  check("city")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage("must be 5 char or +")
    .escape()
    .customSanitizer((string) => string.toLowerCase()),

  check("streetAddress")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 5 })
    .withMessage("something is wrong with the streetAddress ")
    .customSanitizer((string) => string.toLowerCase()),

  check("website")
    .trim()
    .isLength({ min: 4 })
    .withMessage("must be 4+ chars")
    .isURL()
    .customSanitizer((string) => {
      if (
        string.substring(0, 3) === "www" ||
        string.substring(0, 8) !== "https://"
      ) {
        string = "https://" + string;
      }
      return string.toLowerCase();
    }),
];
exports.form2 = [
  check("rating")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("Fill in the rating"),
  check("review").trim().escape().isLength({ max: 200 }),
];
