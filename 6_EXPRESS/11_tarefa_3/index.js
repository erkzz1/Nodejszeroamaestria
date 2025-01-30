const express = require('express')
const app = express()
const port = 5000

const projectRoutes = require('./projects')

app.use(express.static('public'))

app.use('/home', projectRoutes)

app.listen(port, () => {
    console.log(`O servidor está rodando na porta: ${port}`)
})