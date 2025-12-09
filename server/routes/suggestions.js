const express = require('express')
const getSuggestions = require('../controllers/suggestions/getSuggestions')
const allSuggestions = require('../controllers/suggestions/allSuggestions')

// initialize router
const router = express.Router()

// GET at route: http://localhost:8080/suggestions
router.get('/:username', [], getSuggestions)
router.get('/', [], allSuggestions)


module.exports = router
