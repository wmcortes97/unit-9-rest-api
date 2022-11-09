const express = require("express");
const router = express.Router();
const User = require("../models").User;
// const Course = require("../models").Course;

//AsyncHandler
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

router.get(
  "/users",
  asyncHandler(async (req, res) => {
    let users = await User.findAll();
    res.json(users);
  })
);

module.exports = router;
