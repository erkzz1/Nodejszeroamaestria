const router = require('express').Router()

const PetCotroller = require('../controllers/PetController')

//middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post(
  '/create',
  verifyToken,
  imageUpload.array('images'),
  PetCotroller.create
)

module.exports = router
