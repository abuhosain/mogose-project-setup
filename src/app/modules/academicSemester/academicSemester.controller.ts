import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.services'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister is created successfully',
    data: result,
  })
})

const getAllSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemisteFromDb()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all academic semister',
    data: result,
  })
})

const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const id: string = req.params.academicSemisterId
  const result =
    await AcademicSemesterServices.getSingleAcademicSemisterFromDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single academic semister by id',
    data: result,
  })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
  const id: string = req.params.academicSemisterId
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    id,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  })
})

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemister,
  getSingleAcademicSemister,
  updateAcademicSemester,
}
