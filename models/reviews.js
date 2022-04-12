const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  rating: { type: Number, required: true },
  review: { type: String },
});
const review = mongoose.model("Review", ReviewSchema);

module.exports = review;
