const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const menuController = require("../controllers/menu");
const adminMiddleware = require("../middlewares/admin");
const authMiddleware = require("../middlewares/auth");
const menuMiddleware = require("../middlewares/menu");

router.get("/", menuController.getMenu);

router.post(
  "/create",
  [
    adminMiddleware.validateAdmin,
    authMiddleware.verifyToken,
    menuMiddleware.validateMenuCreate,
  ],
  menuController.upload,
  menuController.addMenu
);

module.exports = router;
