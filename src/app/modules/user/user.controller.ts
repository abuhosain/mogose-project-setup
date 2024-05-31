import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createStudent = catchAsync(async (req, res) => {
  const { student: studentData, password } = req.body
  // will call services func to send this data
  const result = await UserServices.createStudentIntoDb(password, studentData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
}
