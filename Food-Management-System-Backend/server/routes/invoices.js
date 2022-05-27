const express = require("express");
var multer = require("multer");

const router = express.Router();
const invoiceModel = require("../models").Invoices;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./server/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post(
  "/upload-proof",
  upload.single("profile-file"),
  async (req, res) => {
    try {
      const user = await invoiceModel.findOne({
        where: {
          user_id: req.body.user_id,
        },
      });
      if (!user) {
        var imagePath = `http://localhost:5000/`;
        imagePath += `${req.file.path}`;
        const invoice = await invoiceModel.create({
          user_id: req.body.user_id,
          dish_id: req.body.dish_id,
          total_meals: req.body.total_meals,
          total_amount: req.body.total_amount,
          status: req.body.status,
          proof_payment: imagePath,
        });
        res.status(200).json({ invoice });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.post("/payment-status", async (req, res) => {
  try {
    const user = await invoiceModel.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    if (user) res.status(200).json({ status: user.status });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/all-payments", async (req, res) => {
  try {
    const payments = await invoiceModel.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/proof-payment", async (req, res) => {
  try {
    const invoice = await invoiceModel.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    await invoice.update(
      {
        status: req.body.status,
      },
      {
        where: {
          user_id: req.body.user_id,
        },
      }
    );
    const resUser = await invoiceModel.findOne({
      where: {
        user_id: req.body.user_id,
      },
    });
    res.status(200).json(resUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
