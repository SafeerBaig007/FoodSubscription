const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");
const userMiddlewre = require("../middlewares/user");

router.get("/", [authMiddleware.verifyToken], userController.getUsers);

router.post("/create", userController.addUser);

router.post("/login", userController.login);

router.post(
  "/update",
  [authMiddleware.verifyToken, userMiddlewre.validateUserLogin],
  userController.updateUser
);

router.post(
  "/delete",
  [authMiddleware.verifyToken, userMiddlewre.validateUserDelete],
  userController.deleteUser
);

module.exports = router;
