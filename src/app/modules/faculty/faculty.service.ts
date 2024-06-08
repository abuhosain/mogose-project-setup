/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
import { TFaculty } from "./facult.interface"
import { FacultySearchableFields } from "./faculty.constant"
import { Faculty } from "./faculty.model"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { User } from "../user/user.model"


const getSingleFacultiesFromDb = async(id : string) => {
    const result = await Faculty.findById(id).populate("academicDepartment")
    return result;
}

const getAllFacultiesFromDb = async(query : Record<string, unknown>) => {
    const facultyQuery = new QueryBuilder(
        Faculty.find().populate("academicDepartment"), query
    )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
    const result = await facultyQuery.modelQuery;
    return result
}

const updateFacultiesIntoDb = async(id : string, payload : Partial<TFaculty>) => {
    const {name, ...remainingFacultyData} = payload;
    const modifiedUpdateData : Record<string, unknown> = {
        ...remainingFacultyData
    };

    if(name && Object.keys(name).length){
        for (const [key, value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`] = value;
        }
    }

    const result = await Faculty.findByIdAndUpdate(id, modifiedUpdateData, {
        new: true,
        runValidators: true,
      });
      return result;
}

const deleteFacultyFromDb = async(id : string) => {
    const session = await mongoose.startSession();
    
    try{
        session.startTransaction();
        const deletedFaculty = await Faculty.findByIdAndUpdate(
            id,
            {isDeleted : true},
            {new : true, session}
        );

        if(!deleteFacultyFromDb){
            throw new AppError(httpStatus.BAD_REQUEST, "Faild to delete faculty")
        }

        // get user _id from deletedFaculty
        const userId = deletedFaculty?.user;
        const deletedUser = await User.findByIdAndUpdate(
            userId,
            {isDeleted : true},
            {new : true, session}
        )

        if(!deletedUser){
            throw new AppError(httpStatus.BAD_REQUEST, "Faild to delete user")
        }
        
        await session.commitTransaction();
        await session.endSession();

    }catch(err : any){
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err)
    }
}



export const FacultyServices = {
    getAllFacultiesFromDb,
    getSingleFacultiesFromDb,
    updateFacultiesIntoDb,
    deleteFacultyFromDb
} 