const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00',
})

try {
  sequelize.authenticate()
  console.log('Conexão estabelecida com sucesso!')
} catch (err) {
  console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize