const menuModal = require('../models').Menu
const multer = require('multer')
const path = require('path');
const menu = require('../models/menu');


const getMenu = async (req, res) => {
    console.log("getmenus:",req.body)
    try{
    let menu = await menuModal.findAll();
    
    res.status(200).send(menu);
    }
    catch (error) { 
      res.status(400).json({error: error.toString()});
    }
  };



const addMenu = async (req, res) => {
    // console.log("reqbody",req.body)
    try{
        // const {name,email,password}=req.body
        // req.body.menu.image= req.file.path
        let reqBody=req.body;
        reqBody.menu[0].image=req.file.path
        console.log("after", reqBody)


        console.log("after",req.body.menu)
    let menuSave = new menuModal({menu:req.body.menu,
        createAt:Date.now(),updatedAt:Date.now()});
    await menuSave.save();
    // emailJob.sendEmail(req.body)
    res.status(201).send(menuSave);
    }
    catch (error) { 
      res.status(400).json({error: error.toString()});
    }
  };




  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

  module.exports = {
    getMenu,
    addMenu,
    upload
};