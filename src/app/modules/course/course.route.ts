import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { CourseValidationSchema } from './course.validation'
import { CourseControllers } from './course.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constance'

const router = express.Router()

// create coursr
router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidationSchema.courseValidationSchema),
  CourseControllers.createCoruse,
)

// single course
router.get('/:id', auth("admin", "faculty", "student"), CourseControllers.getSingleCourse)

// get all course
router.get('',auth("admin", "faculty", "student"), CourseControllers.getAllCourses)

// update course
router.patch(
  '/:id',
  auth("admin"),
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
  auth("admin"),
  validateRequest(
    CourseValidationSchema.facultiesWithZodValidationSchema,
  ),
  CourseControllers.removeFacultiesWithCourse,
)

// delete course
router.delete('/:id', CourseControllers.deletedCourse)

export const CourseRoutes = router
