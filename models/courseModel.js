const mongoose = require('mongoose');


/*


⦁	Users Enrolled - a collection of Users
*/

const courseSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: [true, "The course must have name"],
        trim:true,
        unique:true
    },
    description: {
        type: String,
        required: [true, "Must have description"],
        trim:true,
        maxlength: [50, "A description name must have less or equal then 50 characters"]
    },
    imageUrl: {
        type: String,
        required:[true, 'Course  must have a image']

    },
    duration: {
        type: String,
        required: [true, 'The course must have a duration time'],

    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
     
})


const Course = mongoose.model('Course', courseSchema)

module.exports = Course