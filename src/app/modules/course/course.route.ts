import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { CourseValidationSchema } from './course.validation'
import { CourseControllers } from './course.controller'

const router = express.Router()

// create coursr
router.post(
  '/create-course',
  validateRequest(CourseValidationSchema.courseValidationSchema),
  CourseControllers.createCoruse,
)

// single course
router.get('/:id', CourseControllers.getSingleCourse)

// get all course
router.get('', CourseControllers.getAllCourses)

// update course
router.patch(
  '/:id',
  validateRequest(CourseValidationSchema.updateCourseValidationSchema),
  CourseControllers.updateCourse,
)

router.put(
  '/:courseId/assign-faculties',
  validateRequest(
    CourseValidationSchema.facultiesWithZodValidationSchema,
  ),
  CourseControllers.assignFacultiesWithCourse,
)

// remove faculties
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(
    CourseValidationSchema.facultiesWithZodValidationSchema,
  ),
  CourseControllers.removeFacultiesWithCourse,
)

// delete course
router.delete('/:id', CourseControllers.deletedCourse)

export const CourseRoutes = router
