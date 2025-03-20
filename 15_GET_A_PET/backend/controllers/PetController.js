const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

function validateFields(fields, body) {
  for (const [field, message] of Object.entries(fields)) {
    if (!body[field]) {
      return { valid: false, message }
    }
  }
  return { valid: true }
}

// function to check if the pet belongs to the user pet
async function validatePetOwnership(req, res, id) {
  if (!ObjectId.isValid(id)) {
    res.status(422).json({ message: 'ID inválido' })
    return null
  }

  const pet = await Pet.findOne({ _id: id })
  if (!pet) {
    res.status(404).json({ message: 'Pet não encontrado!' })
    return null
  }

  const token = getToken(req)
  const user = await getUserByToken(token)

  if (pet.user._id.toString() !== user._id.toString()) {
    res.status(422).json({
      message:
        'Houve um problema em processar a sua solicitação, tente novamente mais tarde!',
    })
    return null
  }

  return pet
}

module.exports = class PetController {
  // Create a pet

  static async create(req, res) {
    const { name, age, weight, color } = req.body
    const images = req.files
    const available = true

    //images upload

    // validations
    const validations = {
      name: 'O nome é obrigatório!',
      age: 'A idade é obrigatório!',
      weight: 'O peso é obrigatório!',
      color: 'A cor é obrigatória!',
    }

    const validation = validateFields(validations, req.body)
    if (!validation.valid) {
      res.status(422).json({ message: validation.message })
      return
    }

    if (images.length === 0) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    }

    // get pet owner
    const token = getToken(req)
    const user = await getUserByToken(token)

    // Create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    images.map((image) => {
      pet.images.push(image.filename)
    })

    try {
      const newPet = await pet.save()
      res.status(301).json({
        message: 'Pet cadastrado acom sucesso!',
        newPet,
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt')

    res.status(200).json({
      pets: pets,
    })
  }

  static async getAllUserPets(req, res) {
    //get user from token
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

    res.status(200).json({
      pets,
    })
  }

  // if the user adopted
  static async getAllUserAdoptions(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

    res.status(200).json({
      pets,
    })
  }

  static async getPetById(req, res) {
    const id = req.params.id

    // check owner pet by id
    const pet = await validatePetOwnership(req, res, id)
    if (!pet) return

    res.status(200).json({
      pet: pet,
    })
  }

  static async removePetById(req, res) {
    const id = req.params.id

    const pet = await validatePetOwnership(req, res, id)
    if (!pet) return

    await Pet.findByIdAndDelete(id)
    res.status(200).json({
      message: 'Pet removido com sucesso!',
    })
  }

  static async updatePet(req, res) {
    const id = req.params.id

    // check owner pet by id
    const pet = await validatePetOwnership(req, res, id)
    if (!pet) return

    const { name, age, weight, color, available } = req.body
    const images = req.files

    const updatedData = {}

    //validations
    const validations = {
      name: 'O nome é obrigatório!',
      age: 'A idade é obrigatório!',
      weight: 'O peso é obrigatório!',
      color: 'A cor é obrigatória!',
    }

    const validation = validateFields(validations, req.body)
    if (!validation.valid) {
      res.status(422).json({ message: validation.message })
      return
    } else {
      updatedData.name = name
      updatedData.age = age
      updatedData.weight = weight
      updatedData.color = color
    }

    if (images.length === 0) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    } else {
      updatedData.images = []
      images.map((image) => {
        updatedData.images.push(image.filename)
      })
    }

    await Pet.findByIdAndUpdate(id, updatedData, { new: true })

    res.status(200).json({
      message: 'Pet atualizado com sucesso!',
    })
  }
}
