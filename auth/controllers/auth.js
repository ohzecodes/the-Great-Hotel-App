const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../../models/User");
const sendEmail = require("../utils/sendEmail");
// @desc    Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  res.status(200).json({ sucess: false, token: NULL, data: "you're logout" });
};

function generate(n) {
  var add = 1,
    max = 12 - add;
  if (n > max) {
    return generate(max) + generate(n - max);
  }
  max = Math.pow(10, n + add);
  let min = max / 10;
  let number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

// @desc    Register user
exports.register = async (req, res, next) => {
  const { firstname, lastname, phone, email } = req.body;

  try {
    const user = await User.create({
      firstname,
      lastname,
      phone,
      email,
      password: generate(9),
    });
    res.send({ email: email, newuser: true, err: null });
  } catch (err) {
    if (err.code == 11000) {
      err.add = "User Already exists at " + email;
      return next(new ErrorResponse(err.add, 409));
    } else next(err);
  }
};

// @desc    Forgot Password Initialization
exports.forgotPassword = async (req, res, next) => {
  const { email, newuser } = req.body;
  console.log("New User: ", newuser);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No User found", 404));
    }
    const resetToken = user.getResetPasswordToken(newuser);

    await user.save();
    const now = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      timeZoneName: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
    // Create reset url to email to provided email
    const resetUrl = `${req.headers.origin}/newpassword/${resetToken}`;
    const token_duration = newuser ? 120 : 10;

    // HTML Message
    let message, sub;
    if (newuser) {
      sub = "We made it";
      message = `
      <h1>Link to set a password </h1>
      Hey ${user.firstname}, 
      <h4>Please click on the following link to set your password. </h4>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <p>Thanks,</p> 
    <p>The great hotel app</p>
      <pre>This link expires in ${token_duration} minutes after ${now} </pre>
      <pre>if you didnot didnot make an acount, please ignore this email</pre>
      `;
    } else {
      sub = "Password reset";
      message = `Hey ${user.firstname},
      <h4>You have requested a password reset</h4>
      <p>Please click on the following link</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <pre>This link expires in ${token_duration} from ${now}. </pre>
      <p>The great hotel app</p>
      <pre>if you didnot didnot request a password, please ignore this email</pre>
    `;
    }

    try {
      await sendEmail({
        to: user.email,
        subject: sub,
        text: message,
      });
      console.log("hit");
      res.status(200).send({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset User Password
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  console.log("aya");
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.active = true;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next();
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};
