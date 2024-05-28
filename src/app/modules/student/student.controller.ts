import { StudentService } from './student.services'
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
 
const getAllStudent  = catchAsync( async (req , res) => {
  const result = await StudentService.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode : httpStatus.OK,
    success : true,
    message : "Student get successfully",
    data : result
  })
})

const getSingleStudent  = catchAsync(async (req , res  ) => {
  const {studentId} = req.params;
  const result = await StudentService.getSingleStudentFromDb(studentId);
  sendResponse(res, {
    statusCode : httpStatus.OK,
    success : true,
    message : "get single student data successfully",
    data : result
  })
   
})


const deleteStudent  = catchAsync( async (req , res  ) => {
  const {studentId} = req.params;
  const result = await StudentService.deleteStudentFromDb(studentId);
  sendResponse(res, {
    statusCode : httpStatus.OK,
    success : true,
    message : "delete single student data successfully",
    data : result
  })
})

export const StudentController = {
    getAllStudent,
    getSingleStudent,
    deleteStudent,
}