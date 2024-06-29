import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";

const getSingleFaculty = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await FacultyServices.getSingleFacultiesFromDb(id);
    sendResponse(res, {
        statusCode : httpStatus.OK,
        success : true,
        message : "Single faculties get succesfully",
        data : result
    })
})

const getAllFaculties = catchAsync(async (req, res) => {
    console.log("test", req.cookies)
    const result = await FacultyServices.getAllFacultiesFromDb(req.query);
    sendResponse(res, {
        statusCode : httpStatus.OK,
        success : true,
        message : "Faculties are retrive successfully",
        data : result
    } )
})

const updateFacaulty = catchAsync(async (req, res) => {
    const {id} = req.params;
    const {faculty} = req.body
    const result = await FacultyServices.updateFacultiesIntoDb(id, faculty);
    sendResponse(res, {
        statusCode : httpStatus.OK,
        success : true,
        message : "Faculty data updated succesfully",
        data : result
    })
})

const deleteFaculty = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await FacultyServices.deleteFacultyFromDb(id);

    sendResponse(res, {
        statusCode : httpStatus.OK,
        success : true,
        message : "Faculty data deleted succesfully",
        data : result
    })
})

export const FacultyControllers = {
    getAllFaculties,
    getSingleFaculty,
    updateFacaulty,
    deleteFaculty
}