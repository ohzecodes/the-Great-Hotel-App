const mongoose = require("mongoose");
const connection = require("../db/connection");
const reviewS = require("./reviews");
const hotelS = require("./hotel");
const path = require("path");

const DeleteAllReviews = async () => {
  // delete all reviews
  await reviewS.deleteMany({}, (err, data) => {
    if (!err) {
      console.log("op1");
    }
  });
  // set rev to [] in all the hotels
  await hotelS.updateMany({}, { rev: [] }, (err, data) => {
    if (!err) {
      console.log("op2");
    }
  });
};

const DeleteAllHotels = async () => {
  await hotelS.deleteMany({}, (err, data) => {
    if (!err) {
      console.log("All Hotels delete");
    }
  });
};
const AddNewHotels = async () => {
  /*
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  streetAddress: { type: String, required: true },
  website: { type: String },
  filepath: { type: String },
 */
  let address = [
    "1234 Parkway Drive",
    "4889 Hill Street",
    "4884 Hill Street",
    "234 Spinnaker Lane",
    "4564 Tail Ends Road",
    "3160 Scott Street",
  ];
  let cityPlaces = [
    "Tucson",
    "Tucson",
    "TUCSON",
    "Spring Valley",
    "TUCSON",
    "Spring Valley",
  ].map((e) => e.toLowerCase());

  for (let i = 0; i < address.length; i++) {
    let id = await AddNewReviews(i);
    let newHotel = await new hotelS({
      rev: [id],
      name: `Hotel${i + 1}`,
      city: cityPlaces[i],
      streetAddress: address[i],
      website: `https://Hotel${i + 1}-${cityPlaces[i].replace(" ", "-")}.com`,
      filepath: `public/uploads/hotel${i + 1}.jpeg`,
    }).save();
    console.log(newHotel);
  }
};

const AddNewReviews = async (number) => {
  let review1 = [
    "We loved our stay. Staff were very nice.",
    "The rooms are modern, bright and beautiful. We were treated very well and will return.",
    "we felt very welcome, the staff were very cool. Thank you for your service Mr.Allen Poe",
    "",
    "",
  ];
  // rating: { type: Number, required: true },
  // review: { type: String },

  const r = await reviewS({ rating: 4, review: review1[number] }).save();

  return r._id;
};

const DeleteExtraImages = async () => {
  const notTouch = ["hotel1.jpeg", "hotel2.jpeg", "placeholder.png"];
  const fs = require("fs.promises");
  const directoryPath = path.join(__dirname, "..", "public", "uploads");
  try {
    // filess
    let files = await fs.readdir(directoryPath);

    // filter the Files arr which is where notTouch.find return undefined
    // .find return undefined when the file is not found
    //  filter the Files array and return where  a file is not found in the nottouch
    //
    files = files.filter(
      (fileInfiles) => !notTouch.find((donotTouch) => donotTouch == fileInfiles)
    );

    if (!files.length == 0) {
      // delete everything in filesnow
      files.forEach((e) => {
        fs.unlink(path.join(directoryPath, e)).then(
          console.log(e + " deleted!!")
        );
      });
    } else console.log("zero files to delete");
  } catch (err) {
    console.error(err);
  }
};

connection.once("open", async () => {
  await DeleteExtraImages();
  await DeleteAllReviews();
  await DeleteAllHotels();
  console.log("every thing delete");
  await AddNewHotels(); // with reviews

  console.log("turning off");
  process.exit(0);
});
