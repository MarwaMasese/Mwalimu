const mongoose = require('mongoose')

const Teacher = require('../models/teacherModel')
const lessonRequest = require('../models/lessonRequest')
const Lesson = require('../models/lessonModel')
const jwt = require('jsonwebtoken')
const lessonModel = require('../models/lessonModel')
const studentModel = require('../models/studentModel')



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
  const {name, phone,email,education_system, password, rate, confirmed_password} = req.body

  try {
    const user = await Teacher.signup(name, phone,email,education_system, password, rate, confirmed_password)

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

    const lesson_requests = await lessonRequest.find().sort({createdAt: -1})
  
    res.status(200).json(lessonRequest)
  }

//accept lesson request
const acceptLesson = async (req, res)=>{

    try{
        const teacher_id = req.user._id
        const student_id = req.params
        const duration = req.body

        const lesson = await lessonModel.create({teacher_id: teacher_id, student_id:student_id, duration:duration})
        res.status(200).json(lesson)
        return lesson

    }
    catch(error){
        res.status(400).json({error:error.message})
        console.log(e)
    }
    

    
}
// decline lesson request 
const declineLessonRequest = async(req, res)=>{
    const lesson_id = req.params

    try{
        const declined_lesson = await lessonRequest.lessonRequest.findOneAndUpdate({_id:lesson_id}, {declined: true})
        res.status(200).json(declined_lesson)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }


}

// update Lesson Request
const updateLessonRequest = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Ooops! Seems this Lesson Request does not exist'})
    }
  
    const lesson_request = await lessonRequest.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!lesson_request) {
      return res.status(400).json({error: 'Ooops! Seems this Lesson Request does not exist'})
    }
  
    res.status(200).json(lesson_request)
  }

// View Lessons
const getLesson = async (req, res) => {

    const lessons = await Lesson.find().sort({createdAt: -1})
  
    res.status(200).json()
  }

// view student
const getSingleStudent = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Ooops! Seems that this student doesnt exist'})
    }
  
    const student = await studentModel.findById(id)
  
    if (!student) {
      return res.status(404).json({error: 'Ooops ! Seems this student does not exist or has closed the lesson request'})
    }
    
    res.status(200).json(student)
  }

// // Join Lesson
// const enterLesson = async (req, res)=>{
//     const user_id = req.user._id
//     const lesson_id = req.params
    

// }

module.exports= {loginTeacher, signupTeacher, getSingleStudent, getLesson, getLessonRequests, getSingleRequest, getSingleStudent,updateLessonRequest, declineLessonRequest}