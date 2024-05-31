import express from 'express'
import { AcademicSemesterController } from './academicSemester.controller'
import validateRequest from '../../middleware/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
)

router.get('/', AcademicSemesterController.getAllSemister)

router.get(
  '/:academicSemisterId',
  AcademicSemesterController.getSingleAcademicSemister,
)

router.patch(
  '/:academicSemisterId',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
)

export const AcademicSemesterRoutes = router
