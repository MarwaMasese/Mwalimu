const express = require('express')
const { signupStudent, loginStudent , getTeachers, getSingleTeacher, createLessonRequest, deleteLessonRequest, updateLessonRequest, getSingleRequest} = require('../controllers/studentController')
const requireAuth = require('../middleware/studentRequireAuth')

const router = express.Router()

// login route
router.post('/loginStudent', loginStudent)

// signup route
router.post('/signupStudent', signupStudent)



// GET all teachers
router.get('/studenthome',requireAuth, getTeachers)

// get single teacher
router.get(':/id', getSingleTeacher)

// Create Lesson Request
router.post('/createLessonRequest', createLessonRequest)

// Delete Lesson Request
router.delete('/:id', deleteLessonRequest)

// update Lesson Request
router.patch(':/id', updateLessonRequest)

// get single lesson request
router.get(':/id/lessonRequest', getSingleRequest)



module.exports = router