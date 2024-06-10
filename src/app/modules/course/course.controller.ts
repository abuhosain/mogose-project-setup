import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { CourseServices } from './course.service'

const createCoruse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDb(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course created successfully',
    data: result,
  })
})

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDb(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All course retrive successfully',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.getSingleCourseFromDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '  single course fetched successfully ',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.updateCourseIntoDbIntoDb(
    id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course  is updated succesfully',
    data: result,
  })
})

const deletedCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDb(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: '  deleted course  successfully ',
      data: result,
    })
  })

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties} = req.body
    const result = await CourseServices.assingFacultiesWithCourseIntoDb(courseId, faculties)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties assign successfully ',
      data: result,
    })
  })

const removeFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const {faculties} = req.body
    const result = await CourseServices.removeFacultiesWithCourseFromDb(courseId, faculties)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties remove successfully ',
      data: result,
    })
  })
  

export const CourseControllers = {
  createCoruse,
  getAllCourses,
  getSingleCourse,
  deletedCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse
}
