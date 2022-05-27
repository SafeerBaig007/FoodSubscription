const express = require("express");

const router = express.Router();
const userModel = require("../models").Users;

router.get('/users', async(req, res) => {
    try {
        const users = await userModel.findAll()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router