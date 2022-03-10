const express = require("express");
const User = require("../models/User");
const router = express.Router();


router.get("/", async (_, res) => {
    try {
      let users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  });


router.get("/:userId", async (req, res) => {
    try {
      let user = await User.findOne({
        id: req.params.userId,
      });
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(400).json({
        status: 400,
        message: "No such user was found",
      });
    } catch (err) {
        return res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
});


module.exports = router;