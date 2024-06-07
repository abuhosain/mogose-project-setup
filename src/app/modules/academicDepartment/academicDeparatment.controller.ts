import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentServices } from './academicDepartment.service'

const createAcadamicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicDepartment created done',
    data: result,
  })
})

const getAllAcadmicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDb()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All AcademicDepartment fethced done',
    data: result,
  })
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmenttById(
      departmentId,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '  single academic Department successfully fetched ',
    data: result,
  })
})

const updateAcademicDeparatment = catchAsync(async (req, res) => {
  const { departmentId } = req.params
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDb(
      departmentId,
      req.body,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is updated succesfully',
    data: result,
  })
})

export const AcademicDepartmentController = {
  createAcadamicDepartment,
  getAllAcadmicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDeparatment,
}
