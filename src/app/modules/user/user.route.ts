import express from 'express'
import { UserControllers } from './user.controller'
import { studentValidations } from '../student/student.zod.validation'
import validateRequest from '../../middleware/validateRequest'

const router = express.Router()


router.post(
  '/create-user',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
)

export const UserRoutes = router
