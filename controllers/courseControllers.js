const AppError = require('./../error/appError');
const catchAsync = require('./../error/catchAsync')

const Course = require('./../models/courseModel')




exports.getAllCourse = catchAsync( async (req, res, next) => {
  
    const course = await Course.find()
    
    // SEND RESPONSE
    res.status(200).json({
      results:course.length,
      status: 'success',
      data: {
         course
      }
    });
 
});

exports.getCourse = catchAsync( async (req, res) => {

    const course = await Course.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })
 
    if(!course) {
      return  next(new AppError("Course not found"), 404)
      }
    res.status(200).json({
      status: 'success',
      data: {
        course
      }
    });
  
});

exports.createCourse = catchAsync( async (req, res,next) => {
  

    const newCourse = await Course.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
       course: newCourse
      }
    });

});

exports.updateCourse = catchAsync( async (req, res, next) => {
  
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
       runValidators: true
    });
    if(!course) {
      return  next(new AppError("Course not found"), 404)
      }

    res.status(200).json({
      status: 'success',
      data: {
        course
      }
    });

});

exports.deleteCourse = catchAsync( async (req, res, next) => {
  
  const course =  await Course.findByIdAndDelete(req.params.id);

    if(!course) {
      return  next(new AppError("Course not found"), 404)
      }

    res.status(204).json({
      status: 'success',
      data: null
    });
 
});