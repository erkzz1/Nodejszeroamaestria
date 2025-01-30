const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/taskController')

router.get('/add', TaskController.createTask)
router.get('/', TaskController.showTask)

module.exports = router