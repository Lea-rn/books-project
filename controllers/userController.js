const user = require("../models/userModel");
const bcrypt = require("bcrypt");

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
