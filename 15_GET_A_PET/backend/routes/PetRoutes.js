const router = require('express').Router()

const PetCotroller = require('../controllers/PetController')

//middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')
const PetController = require('../controllers/PetController')

router.post(
  '/create',
  verifyToken,
  imageUpload.array('images'),
  PetCotroller.create
)
router.get('/', PetController.getAll)
router.get('/mypets', verifyToken, PetController.getAllUserPets)
module.exports = router
