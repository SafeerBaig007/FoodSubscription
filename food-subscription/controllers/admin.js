const adminModal = require("../models").Admin;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAdmins = async (req, res) => {
  // console.log("getusers")
  // try{
  // let users = await usersModel.findAll({include: [{
  //   model: reservationModel,
  //   include:[billModel]
  // }]});
  // res.status(200).send(users);
  // }
  // catch (error) {
  //   res.status(400).json({error: error.toString()});
  // }
};

const addAdmin = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    let adminSave = new adminModal({
      name,
      email,
      password,
      createAt: Date.now(),
      updatedAt: Date.now(),
    });
    await adminSave.save();
    // emailJob.sendEmail(req.body)
    res.status(201).send(adminSave);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const login = async (req, res) => {
  console.log("login", req.body);
  try {
    email = req.body.email;
    console.log(email);
    const admin = await adminModal.findOne({
      // include: [{
      //   model: usersModel,
      //   // as: 'user',
      // }],
      where: { email },
    });
    console.log("userfound", admin);
    //  res.status(200).json({"user":req.body});
    // if (user && await(bcrypt.compareSync(req.body.password, user.password))) {
    //       const token = jwt.sign(
    //         { id: user.id, email },
    //         process.env.TOKEN_KEY,
    //         {
    //           expiresIn: "2h",
    //         }
    //       );
    //       user.token = token;
    //       user.update({
    //         token: token
    //       });
    //       res.status(200).json({"user":user});
    // }
    if (admin) {
      jwt.sign({}, "secretKey", (err, token) => {
        res.status(200).json({ token: token, user: admin });
      });
      // res.status(200).json({"user":user});
    } else res.status(400).send("Invalid Credentials");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateAdmin = async (req, res) => {
  console.log("adduser", req.body);
  try {
    let object = {};
    if (req.body.name) object.name = req.body.name;
    if (req.body.email) object.email = req.body.email;
    if (req.body.password) object.password = req.body.password;
    adminModal.update(object, {
      where: {
        id: req.body.id,
      },
    });
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    adminModal.destroy({
      where: {
        id: req.body.user_id,
      },
    });
    res.status(200).send("User deleted Successfully");
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

module.exports = {
  getAdmins,
  addAdmin,
  login,
  updateAdmin,
  deleteAdmin,
};
