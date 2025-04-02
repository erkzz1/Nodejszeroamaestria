const User = require('../models/User')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const fs = require('fs')

const path = require('path')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

function validateFields(fields, body) {
  for (const [field, message] of Object.entries(fields)) {
    if (!body[field]) {
      return { valid: false, message }
    }
  }
  return { valid: true }
}

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body

    // Validations
    const validations = {
      name: 'O nome é obrigatório!',
      email: 'O email é obrigatório!',
      phone: 'O telefone é obrigatório!',
      password: 'A senha é obrigatória!',
      confirmpassword: 'A confirmação de senha é obrigatória!',
    }

    const validation = validateFields(validations, req.body)
    if (!validation.valid) {
      res.status(422).json({ message: validation.message })
      return
    }

    if (password !== confirmpassword) {
      res.status(422).json({ message: 'As senhas não condizem!' })
      return
    }

    // check if user exists
    const userExists = await User.findOne({ email: email })

    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    // Create a password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //Create a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    })

    try {
      const newUser = await user.save()

      await createUserToken(newUser, req, res)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async login(req, res) {
    const { email, password } = req.body

    const validations = {
      email: 'O email é obrigatório!',
      password: 'A senha é obrigatória!',
    }

    const validation = validateFields(validations, req.body)
    if (!validation.valid) {
      res.status(422).json({ message: validation.message })
      return
    }

    const user = await User.findOne({ email: email })

    // check user login
    if (!user) {
      res.status(422).json({ message: 'Usuário ou senha inválidos!' })
      return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(422).json({ message: 'Usuário ou senha inválidos!' })
      return
    }
    try {
      await createUserToken(user, req, res)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, 'nossosecret')

      currentUser = await User.findById(decoded.id)

      currentUser.password = undefined
    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) {
    const id = req.params.id

    const user = await User.findById(id).select('-password')

    if (!user) {
      res.status(422).json({
        message: 'Usuário não encontrado!',
      })
      return
    }

    res.status(200).json({ user })
  }

  static async editUser(req, res) {
    const id = req.params.id

    // check if user exists
    const token = getToken(req)
    const user = await getUserByToken(token)

    const { name, email, phone, password, confirmpassword } = req.body

    if (req.file) {
      // Remove imagem antiga, se existir
      if (user.image) {
        const oldImagePath = path.join(
          __dirname,
          '../../public/images',
          user.image
        )
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }
      user.image = req.file.filename
    }

    //validations
    const validations = {
      name: 'O nome é obrigatório!',
      email: 'O email é obrigatório!',
      phone: 'O telefone é obrigatório!',
    }
    const validation = validateFields(validations, req.body)
    if (!validation.valid) {
      res.status(422).json({ message: validation.message })
      return
    }

    const userExists = await User.findOne({ email: email })

    //check if email already taken
    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor utilize outro e-mail!' })
      return
    }
    user.name = name
    user.email = email
    user.phone = phone

    if (password !== confirmpassword) {
      res.status(422).json({ message: 'As senhas não condizem!' })
      return
    } else if (password === confirmpassword && password != null) {
      // creatig new password
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      user.password = passwordHash
    }
    try {
      await User.findOneAndUpdate({ _id: id }, { $set: user }, { new: true })

      res.status(200).json({ message: 'Usuário atualizado com sucesso!' })
    } catch (error) {
      res.status(500).json({ message: error })
      return
    }
  }
}
