const express = require('express')
const router = express.Router()

const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/',(req, res) => {
    res.sendFile(`${basePath}/pag1.html`)
})

router.get('/:id', (req, res) => {
    res.sendFile(`${basePath}/pag2.html`)
})

module.exports = router