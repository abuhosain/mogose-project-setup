import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcadamicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(req.body);
    sendResponse(res, {
        statusCode : httpStatus.OK,
        success : true,
        message : "AcademicFaculty created done",
        data : result
    })
})

const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDb();
    sendResponse(res, {
        statusCode : httpStatus.OK,
        success : true,
        message : "All AcademicFaculty fethced done",
        data : result
    })
})



const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const {facultyId} = req.params
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultById(facultyId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: '  single academic faculty successfully fetched ',
      data: result,
    })
  })
  
  const updateAcademicFaculty = catchAsync(async (req, res) => {
    const {facultyId} = req.params
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(
        facultyId,
      req.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty is updated succesfully',
      data: result,
    })
  })
  

export const AcademicFacultyController = {
    createAcadamicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}