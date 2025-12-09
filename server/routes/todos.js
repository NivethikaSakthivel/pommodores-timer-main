const express = require('express')
const saveTodos = require('../controllers/todos/saveTodos')
const getTodos = require('../controllers/todos/getTodos')
const deleteTodos = require('../controllers/todos/deleteTodos')

// initialize router
const router = express.Router()

// POST at route: http://localhost:8080/todos/save
router.post('/save', [], saveTodos)
// GET at route: http://localhost:8080/todos/:username
router.get('/:username', [], getTodos)
// DELETE at route: http://localhost:8080/todos/delete/:username
router.put('/delete/:username', [], deleteTodos)


module.exports = router
