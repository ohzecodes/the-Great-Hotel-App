const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// name should be uniq
const HotelSchema = new Schema({
  name: {type: String, required: true,unique: true},
  city: {type: String, required: true},
  streetAddress:{type:String, required: true},
  website:{type:String}, 
  filepath:{type:String},
  
  rev:[{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

const hotel = mongoose.model('Hotel',HotelSchema);

module.exports = hotel;
