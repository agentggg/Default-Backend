const express = require('express');
const router = express.Router();
const views = require('./views')

router.get('/list', views.get_courses)
router.put('/new_course', views.new_course)
router.post('/subscribe', views.user)

module.exports = router 