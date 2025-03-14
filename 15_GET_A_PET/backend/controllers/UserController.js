const User = require('../models/User')

const bcrypt = require('bcrypt')

const createUserToken = require('../helpers/create-user-token')

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
}
