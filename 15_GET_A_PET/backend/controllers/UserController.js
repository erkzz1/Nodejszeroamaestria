const User = require('../models/User')

const bcrypt = require('bcrypt')

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

    for (const [field, message] of Object.entries(validations)) {
      if (!req.body[field]) {
        res.status(422).json({ message })
        return
      }
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
      phone,
      password: passwordHash,
    })

    try {
      const newUser = await user.save()
      res.status(201).json({
        message: 'Usuário cadastrado com sucesso!',
        newUser,
      })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
