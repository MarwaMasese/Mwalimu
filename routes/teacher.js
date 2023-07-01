const express = require('express')

// controller functions
const {loginTeacher, signupTeacher, getSingleStudent, getLesson, getLessonRequests, getSingleRequest, getSingleStudent,updateLessonRequest, declineLessonRequest}= require('../controllers/teacherController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

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