module.exports = (app, hotelS) => {
  app.get("/api/", (req, res) => {
    res.send("200");
  });
  app.get("/api/city/:cities", (req, res) => {
    hotelS
      .find({ city: req.params.cities })
      .populate({ path: "rev" })
      .then((r) => res.status(200).send(r))
      .catch((c) => res.status(400).send(c));
  });

  app.get("/api/city/:cities/hotel/:hotel", (req, res) => {
    hotelS
      .findOne({
        city: req.params.cities,
        name: req.params.hotel,
      })
      .populate({ path: "rev" })
      .then((r) => res.status(200).send(r))
      .catch((c) => res.status(400).send(c));
  });
};
