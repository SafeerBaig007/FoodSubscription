const express = require('express')
const routes = express.Router()

routes.use('/signup', (req, res)=>{
    res.status(201).send('ok')
})

routes.use('/login', (req, res)=>{
    res.status(201).send('ok')
})


module.exports = routes