import express from 'express'
import { UserControllers } from './user.controller'
import { studentValidations } from '../student/student.zod.validation'
import validateRequest from '../../middleware/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'

const router = express.Router()
// create student
router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
)

// create faculty
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);


// create admin

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
)

export const UserRoutes = router
