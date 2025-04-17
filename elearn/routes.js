const express = require('express');
const router = express.Router();
const views = require('./views')

router.get('/list', views.get_courses)
router.put('/list/:id', views.update_course)
router.put('/new_course', views.new_course)
router.put('/subscribe', views.user)
router.put('/analytics', views.analytics)
router.post('/feedback', views.feedback)

module.exports = router 