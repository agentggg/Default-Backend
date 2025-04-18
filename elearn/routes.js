const express = require('express');
const router = express.Router();
const views = require('./views')

router.get('/list', views.get_courses)
router.put('/list/:id', views.update_course)
router.delete('/list/:id', views.delete_card)
router.put('/new_course', views.new_course)
router.put('/subscribe', views.user)
router.put('/analytics', views.analytics)
router.post('/feedback', views.feedback)
router.get('/health_check', views.health_check)
router.get('/get_course/:name_identifier', views.get_course)



module.exports = router 