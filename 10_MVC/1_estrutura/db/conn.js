const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemvc2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00'
})

try {

    sequelize.authenticate()
    console.log('Conectamos ao MySQL!')

} catch(error) {
    console.log(`Não foi possível conectar: ${error}`)
}

exports.default = sequelize