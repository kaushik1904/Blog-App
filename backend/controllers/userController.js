const User = require("./../models/user");
const bcrypt = require("bcryptjs");

exports.getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  return res.status(200).json({ users });
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(e);
  }

  if (existingUser) {
    return res.status(400).json({ message: "user already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    user.save();
  } catch (e) {
    return console.log(e);
  }

  res.status(201).json({ user });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(e);
  }

  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Couldn't find the user for this email address" });
  }

  const isPassword = bcrypt.compareSync(password, existingUser.password);

  if (!isPassword) {
    return res.status(404).json({ message: "Please Correct Password" });
  }

  res.status(200).json({ message: "Login Successfully" });
};
