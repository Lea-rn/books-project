const user = require("../models/userModel");
const bcrypt = require("bcrypt");

//// auth : authentication
///////////// register ::

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; ///// user eli kteb hom fel input
    /////// hash password (cryptage du mot de passe) :
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

///////// login ::

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; ///// 123
    //// check user :
    const result = await user.findOne({ email }); //// object

    if (!result) {
      return res.render("error");
    }

    ////// compare password :
    const isMatch = await bcrypt.compare(password, result.password); //// boolean

    if (!isMatch) {
      return res.render("error");
    }

    req.session.user = result;

    res.redirect("/ourbooks");

    // if (!result) {
    //   return res.send("Email not found")
    // }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
