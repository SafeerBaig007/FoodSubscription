const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice");
const adminMiddleware = require("../middlewares/admin");
const authMiddleware = require("../middlewares/auth");
const invoiceMiddleware = require("../middlewares/invoice");

router.get("/", [authMiddleware.verifyToken], invoiceController.getInvoices);

router.post(
  "/update",
  [
    adminMiddleware.validateAdmin,
    authMiddleware.verifyToken,
    invoiceMiddleware.validateInvoiceCreate,
  ],
  invoiceController.updateInvoice
);

router.post(
  "/create",
  [adminMiddleware.validateAdmin, authMiddleware.verifyToken],
  invoiceController.upload,
  invoiceController.addInvoice
);

module.exports = router;
