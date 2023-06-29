const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lessonSchema = new Schema({
     teacher_id: {
        type: String,
        required: true
      },
      student_id:{
        type: String,
        required: true,
        unique: true
      }
}, { timestamps: true })

module.exports = mongoose.model('Lesson', lessonSchema)