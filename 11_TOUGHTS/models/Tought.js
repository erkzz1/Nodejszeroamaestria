const { Model, DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Tought = db.define('Tought', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
})

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought
