const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const authMiddleware = require("../middlewares/auth");

router.get("/", [authMiddleware.verifyToken], adminController.getAdmins);

router.post("/create", adminController.addAdmin);

router.post(
  "/update",
  [authMiddleware.verifyToken],
  adminController.updateAdmin
);

router.post(
  "/delete",
  [authMiddleware.verifyToken],
  adminController.deleteAdmin
);

router.post("/login", adminController.login);

module.exports = router;
