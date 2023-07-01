const express = require('express')

// controller functions
const {loginTeacher, signupTeacher, getSingleStudent, getLesson, getLessonRequests, getSingleRequest, getSingleStudent,updateLessonRequest, declineLessonRequest}= require('../controllers/teacherController')

const router = express.Router()

// login route
router.post('/login', loginTeacher)

// signup route 
router.post('/signup', signupTeacher)

// view student
router.get('/:id/student', getSingleStudent)

// view Lesson
router.get('/:id/lesson', getLesson)

//get lesson requests
router.get('/lessonRequests ', getLessonRequests )

// get single lesson request 
router.get('/:id', getSingleRequest)

//update lesson request
router.patch(':/id', updateLessonRequest)

// decline lesson request
router.post(':/id', declineLessonRequest)

module.exports = router