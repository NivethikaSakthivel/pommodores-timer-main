const express = require('express')
const save = require('../controllers/pomodoros/save')
const getPomos = require('../controllers/pomodoros/getPomos')

// initialize router
const router = express.Router()

router.post('/save', [], save)

router.get('/getPomos/:username', [], getPomos)

module.exports = router