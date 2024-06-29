import express from 'express'
import { UserControllers } from './user.controller'
import { studentValidations } from '../student/student.zod.validation'
import validateRequest from '../../middleware/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from './user.constance'

const router = express.Router()
// create student
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
)

// create faculty
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
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
