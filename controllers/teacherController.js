const mongoose = require('mongoose')

const Teacher = require('../models/teacherModel')
const lessonRequest = require('../models/lessonRequest')
const Lesson = require('../models/lessonModel')
const jwt = require('jsonwebtoken')



const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a teacher
const loginTeacher = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await Teacher.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a teacher
const signupTeacher = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await Teacher.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



// View Single Lesson Request 
const getSingleRequest = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Ooops! Seems that this lesson request doesnt exist'})
    }
  
    const lesson_request = await lessonRequest.findById(id)
  
    if (!lesson_request) {
      return res.status(404).json({error: 'Ooops ! Seems this lesson request doesnt exist'})
    }
    
    res.status(200).json(lesson_request)
  }
// View all lesson requests
const getLessonRequests = async (req, res) => {

    const lesson_requests = await Teacher.find().sort({createdAt: -1})
  
    res.status(200).json()
  }
  
// decline lesson request 

// update lesson request 

// View Lessons
const getLesson = async (req, res) => {

    const lessons = await Lesson.find().sort({createdAt: -1})
  
    res.status(200).json()
  }

// View Lesson

// view student
const getSingleStudent = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Ooops! Seems that this student doesnt exist'})
    }
  
    const student = await Teacher.findById(id)
  
    if (!student) {
      return res.status(404).json({error: 'Ooops ! Seems this student does not exist or has closed the lesson request'})
    }
    
    res.status(200).json(student)
  }

// Join Lesson


module.exports= {loginTeacher, signupTeacher, getSingleStudent}