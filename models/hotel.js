const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  streetAddress: { type: String, required: true },
  website: { type: String },
  filepath: { type: String },

  rev: [{ type: Schema.Types.ObjectId, ref: "Review" }], //<-- Capitalize
});

// hotel.lookup({
//   from: "reviews",
//   localField: "rev[0]",
//   foreignField: "string",
//   as: "rev",
// });
const hotel = mongoose.model("Hotel", HotelSchema);

module.exports = hotel;
