import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.Validation'
import { AcademicDepartmentController } from './academicDeparatment.controller'

const router = express.Router()

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcadamicDepartment,
)

router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
)

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDeparatment,
)

router.get('/', AcademicDepartmentController.getAllAcadmicDepartments)

export const AcademicDepartmentRoutes = router
