const User = require("../models/user");

const userController = {
  createUser: async (req, res) => {
    console.log(req.body, "req ... body");
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
  getUsers: async (req, res) => {
    const all_users = await User.find().select(
      "firstName lastName email mobileNumber "
    );

    res.status(200).json({
      status: "success",
      data: all_users,
      message: "Users found successfully!",
    });
  },
  deleteUser: async (req, res) => {
    try {
      const user_id = req.params.id;

      await User.findByIdAndDelete(user_id);

      const user = await User.findById(user_id);

      if (!user) {
        return res.status(200).json({
          status: "success",
          message: "User deleted.",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get user details by id
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      const userDoc = await User.findById(id);
      if (!userDoc) {
        return res.status(400).json("user does not exist");
      }
      res.json(userDoc);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  editUser: async (req, res) => {
    try {
      console.log(req.body,"req body rrrrrr")

      const { id, firstName, lastName, email, mobileNumber } = req.body;
      console.log(id, firstName, lastName, email, mobileNumber,"req body")
      const existing_user = await User.findById(id);

      if (existing_user) {
        await User.findOneAndUpdate(
          { _id: id },
          {
            firstName,
            lastName,
            email,
            mobileNumber,
          }
        );

        res.status(200).json({
          status: "success",
          id: id,
          message: "User edited.",
        });
      }
      else{
        res.status(400).json({
          status: "error",
          message: "User Id not found.",

        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userController;
