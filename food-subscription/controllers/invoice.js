const invoiceModal = require("../models").Invoice;
// const multer = require("multer");
// const path = require("path");

const multer = require("multer");
const path = require("path");

const getInvoices = async (req, res) => {
  // console.log("getusers")
  try {
    let invoice = await invoiceModal.findAll();
    res.status(200).send(invoice);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const addInvoice = async (req, res) => {
  console.log("reqbodyyyy", req.body);
  const { image } = req.body;
  console.log("paymentproof", image);
  try {
    let reqBody = req.body;
    console.log("fileeee", req.file);
    reqBody.payment_proof = req.file.path;
    console.log("afterrrr", reqBody);
    let invoiceSave = new invoiceModal({
      user_id: reqBody.user_id,
      amount: reqBody.amount,
      payment_proof: req.file.path,
      payment_status: reqBody.payment_status,

      createAt: Date.now(),
      updatedAt: Date.now(),
    });
    await invoiceSave.save(invoiceSave);
    // emailJob.sendEmail(req.body)
    res.status(201).send(invoiceSave);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const updateInvoice = async (req, res) => {
  console.log("reqbodyyyy", req.body);
  // const { image } = req.body;
  // console.log("paymentproof", image);
  try {
    let reqBody = req.body;
    console.log("fileeee", req.file);
    // reqBody.payment_proof = req.file.path;
    console.log("afterrrr", reqBody);

    let object = {};
    object.payment_status = req.body.payment_status;
    invoiceModal.update(object, {
      where: {
        id: req.body.invoice_id,
      },
    });
    // await invoiceSave.save("updatedddd");
    // emailJob.sendEmail(req.body)
    res.status(201).send("updatedddd");
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000000000000" },
  fileFilter: (req, file, cb) => {
    console.log("fileter", req);
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    console.log("upload");

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

module.exports = {
  getInvoices,
  addInvoice,
  upload,
  updateInvoice,
};
