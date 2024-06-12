import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { SemesterRegestrationValidations } from './semesterRegesteration.validation'
import { SemesterRegestrationControllers } from './semesterRegestration.controller'

const router = express.Router()

// create semester regestration
router.post(
  '/create-semester-regestration',
  validateRequest(
    SemesterRegestrationValidations.createSemesterRegestrationValidationSchema,
  ),
  SemesterRegestrationControllers.createSemesterRegestration,
)

// get single semester regestration
router.get(
  '/:id',
  SemesterRegestrationControllers.getSingleSemesterRegestration,
)

// update single semester regestration
router.patch(
  '/:id',
  validateRequest(
    SemesterRegestrationValidations.updateSemesterRegestrationValidationSchema,
  ),
  SemesterRegestrationControllers.updateSemesterRegestration,
)

// get all semester regestraton
router.get('', SemesterRegestrationControllers.getAllSemesterRegestration)

export const SemesterRegestrationRoutes = router
