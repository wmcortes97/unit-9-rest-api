const express = require("express");
const router = express.Router();
const User = require("../models").User;
// const Course = require("../models").Course;
// const { authenticateUser } = require("./middleware/authenticateUser");

//asyncHandler
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

//------------------USERS ROUTES--------------//
/*GET route that returns all properties and values of currently authenticates user */
router.get(
  "/users",
  asyncHandler(async (req, res) => {
    let users = await User.findAll();
    res.json(users);
  })
);

/*POST route that will create a new user */
router.post(
  "/users",
  asyncHandler(async (req, res) => {})
);

//-------------------COURSE ROUTES---------------//
/*GET route that will return all courses including the User associated with each course*/
router.get(
  "/courses",
  asyncHandler(async (req, res) => {})
);

/*GET route that will return the corresponding course including the User associated with that course */
router.get(
  "/courses/:id",
  asyncHandler(async (req, res) => {})
);

/*POST route that will create a new course */
router.post(
  "/courses",
  asyncHandler(async (req, res) => {})
);

/*PUT route that will update a new course */
router.put(
  "/courses/:id",
  asyncHandler(async (req, res) => {})
);

/*DELETE route that will delete the corresponing course */
router.delete(
  "/courses/:id",
  asyncHandler(async (req, res) => {})
);

module.exports = router;
