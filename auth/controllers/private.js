// const User = require("../../models/User");
exports.getPrivateRoute = (req, res, next) => {
  res.status(200).json({
    success: true,

    user: {
      ...req.user,
    },
  });
};
// exports.editUser = async (req, res, next) => {
//   const { data } = await User.findById(req.body.id).update({
//     phone: req.body.phone,
//     email: req.body.email,
//   });
//   res.send(data);
// };
