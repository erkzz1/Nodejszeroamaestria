const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
  'User',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      images: {
        type: Array,
        required: true,
      },
      avaliable: {
        type: Boolean,
      },
      user: Object,
      adopter: Object,
    },
    { timestamps: true }
  )
)

module.exports = User
