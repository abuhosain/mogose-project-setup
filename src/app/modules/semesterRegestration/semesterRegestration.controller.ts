import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SemesterRegestrationServices } from './semesterRegestration.service'

const createSemesterRegestration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegestrationServices.createSemseterRegestrationIntoDB(
      req.body,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semesterRegestration is created  succesfully',
    data: result,
  })
})

const getAllSemesterRegestration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegestrationServices.getAllSemseterRegestrationFromDB(
      req.query,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semesterRegestration is fully fetched  succesfully',
    data: result,
  })
})

const getSingleSemesterRegestration = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await SemesterRegestrationServices.getSingleSemseterRegestrationFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single semesterRegestration is retrive  succesfully',
    data: result,
  })
})

const updateSemesterRegestration = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await SemesterRegestrationServices.updateSemseterRegestrationIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single semesterRegestration is retrive  succesfully',
    data: result,
  })
})

export const SemesterRegestrationControllers = {
  createSemesterRegestration,
  getAllSemesterRegestration,
  getSingleSemesterRegestration,
  updateSemesterRegestration,
}
