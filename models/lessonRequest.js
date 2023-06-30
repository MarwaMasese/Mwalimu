const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lessonRequestSchema = new Schema({
     teacher_id: {
        type: String,
        required: true
      },
      student_id:{
        type: String,
        required: true,
      },
      declined:{
        type:Boolean,
        default:false, 
        required: true
      }
}, { timestamps: true })

module.exports = mongoose.model('LessonRequest', lessonRequestSchema)