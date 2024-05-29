/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentId } from "./userr.utils";

const createStudentIntoDb = async (password : string ,payload : TStudent) => {
    // create a user object
    const userData : Partial<TUser> = {};

    // set user password
    userData.password = password || (config.default_password as string)
    // create user role
    userData.role = "student";

    // year semester code 4 digit number



    // find academic semester info 
    const admissiionSemester : any = await AcademicSemester.findById(payload.admissiionSemester)

    
    // set manually genearated id
    userData.id  = await generatedStudentId(admissiionSemester);

    // create a user
    const newUser = await User.create(userData);

    // create a student
    if( Object.keys(newUser).length){
        payload.id = newUser.id;
        payload.user = newUser._id
        
        const newStudent = await Student.create(payload);
        return newStudent;
    }
}

export const UserServices = {
    createStudentIntoDb
} 