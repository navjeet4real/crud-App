const User = require("../models/user");

const userController = {
  createUser: async (req, res) => {
    console.log(req.body, "req ... body")
    const { firstName, lastName, email, mobileNumber } = req.body;
    const existing_user = await User.findOne({ email: email });

    if (existing_user) {
      res.status(400).json({
        status: "error",
        message: "User already created.",
      });
    } else {
      //   var first_Name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      //   var last_Name = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      var newUser = new User({
        firstName,
        lastName,
        email,
        mobileNumber,
      });
      await newUser.save();
      res.status(200).json({
        status: "Success",
        message: "User Created Successfully",
      });
    }
  },
  getUsers: async (req, res) => {},
};

module.exports = userController;
