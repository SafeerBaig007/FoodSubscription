const express = require("express");
var multer  = require('multer')

const router = express.Router();
const dishModel = require("../models").Dishes;


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./server/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });


router.get("/get", async (req, res) => {
  try {
    const dishes = await dishModel.findAll();
    res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post(
  "/profile-upload-single",
  upload.single("profile-file"),
  async(req, res, next) => {
    try {
      var imagePath = `http://localhost:5000/`;
      imagePath += `${req.file.path}`;
      var response = `http://localhost:5000/`
      response += `${req.file.path}`
      const dish = await dishModel.create({
        name: req.body.name.toLowerCase(),
        description: req.body.description,
        price: req.body.price,
        image: imagePath,
      });
      res.status(200).json({data: dish});
    } catch (error) {
      console.log("catch me aya");
      res.status(500).send(error);
    }
  }
);

router.put(
  "/update/:id",
  upload.single("profile-file"),
  async (req, res, next) => {
    try {
      const dish = await dishModel.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (dish) {
        var imagePath = `http://localhost:5000/`;
        imagePath += `${req.file.path}`;
        console.log(req.body, imagePath);
        const updatedDish =  await dish.update({
          name: req.body.name.toLowerCase(),
          description: req.body.description,
          price: req.body.price,
          image: imagePath,
        });
        res.status(200).json({data: updatedDish});
      }
    } catch (error) {
      console.log("catch me aya");
      res.status(500).send(error);
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    await dishModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Dish deleted successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
