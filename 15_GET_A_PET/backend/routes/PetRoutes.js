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
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.get('/:id', PetController.getPetById)
router.delete('/:id', verifyToken, PetController.removePetById)
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet)

module.exports = router
