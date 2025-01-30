const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/taskController')

router.get('/add', TaskController.createTask)
router.post('/add', TaskController.createTaskSave)
router.get('/', TaskController.showTask)

module.exports = router