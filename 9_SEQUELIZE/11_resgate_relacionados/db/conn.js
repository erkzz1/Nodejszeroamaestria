const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize2', 'root', '', {
    host:'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
        
    
})

try {

    sequelize.authenticate()
    console.log('Conectamos com sucesso ao Sequelize!')
    
} catch(err) {
    console.log('Não foi possível conectar: ', err)
}

module.exports = sequelize