const mongoose = require("mongoose");
const hotels= require("./hotel")
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    // idoftheHotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    rating:{type: Number,required: true},
    review: {type: String }
});
const review = mongoose.model("Review", ReviewSchema);

module.exports = review;
