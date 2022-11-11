const express = require("express");
const app = require("../app");
const router = express.Router();
const User = require("../models").User;
const Course = require("../models").Course;
const { authenticateUser } = require("../middleware/authenticateUser");

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
  authenticateUser,
  asyncHandler(async (req, res) => {
    let user = req.currentUser;

    res.json({
      fName: user.firstName,
      lName: user.lastName,
      email: user.emailAddress,
    });
  })
);

/*POST route that will create a new user */
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).json({ message: "Account successfully created!" });
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

//-------------------COURSE ROUTES---------------//
/*GET route that will return all courses including the User associated with each course*/
router.get(
  "/courses",
  authenticateUser,
  asyncHandler(async (req, res) => {})
);

/*GET route that will return the corresponding course including the User associated with that course */
router.get(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {})
);

/*POST route that will create a new course */
router.post(
  "/courses",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Course.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.json(course);
  })
);

/*PUT route that will update a new course */
router.put(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {})
);

/*DELETE route that will delete the corresponing course */
router.delete(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {})
);

module.exports = router;
