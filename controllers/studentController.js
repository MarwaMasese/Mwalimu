const mongoose = require('mongoose')

const Teacher = require('../models/teacherModel')
const Student = require('../models/studentModel')
const lessonRequest = require('../models/lessonRequest')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a student
const loginStudent = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await Student.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a student
const signupStudent = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await Student.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}



// get all teachers
const getTeachers = async (req, res) => {
  const user_id = req.user._id

  const teachers = await Teacher.find({user_id}).sort({createdAt: -1})

  res.status(200).json(teachers)
}

// get a single teacher
const getSingleTeacher = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Ooops! Seems that this teacher doesnt exist'})
    }
  
    const teacher = await Teacher.findById(id)
  
    if (!teacher) {
      return res.status(404).json({error: 'Ooops ! Seems this teacher does not exist'})
    }
    
    res.status(200).json(teacher)
  }

  // create new lesson request
const createLessonRequest = async (req, res) => {
    const teacher_id = req.params
    const student_id = req.user._id 
    const {lesson_date, duration} = req.body

  
    let emptyFields = []
  
    if(!lesson_date) {
      emptyFields.push('Date')
    }
    if(!duration) {
      emptyFields.push('Duration')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
  
    // add doc to db
    try {
      const lessonRequest = await lessonRequest.create({student_id,teacher_id, lesson_date, duration})
      res.status(200).json(lessonRequest)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

// Delete Lesson Request 
const deleteLessonRequest = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Ooops! Seems this Lesson Request does not exist'})
    }
  
    const lesson_request = await lessonRequest.findOneAndDelete({_id: id})
  
    if (!lesson_request) {
      return res.status(400).json({error: 'Ooops! Seems this Lesson Request does not exist'})
    }
  
    res.status(200).json(lesson_request)
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



module.exports = { signupStudent, loginStudent , getTeachers, getSingleTeacher, createLessonRequest, deleteLessonRequest, updateLessonRequest}


  