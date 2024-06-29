/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateAdminId, generatedFacultyId, generatedStudentId } from './userr.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { TFaculty } from '../faculty/facult.interface'
import { AcademicDepartment } from '../academicDepartment/academicDapartment.model'
import { Faculty } from '../faculty/faculty.model'
import { TAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {}

  // set user password
  userData.password = password || (config.default_password as string)
  // create user role
  userData.role = 'student'

  // year semester code 4 digit number

  // find academic semester info
  const admissiionSemester: any = await AcademicSemester.findById(
    payload.admissiionSemester,
  )

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // set manually genearated id
    userData.id = await generatedStudentId(admissiionSemester)

    // create a user [transistion -1]
    const newUser = await User.create([userData], { session })

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create users')
    }
    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    //  create a student transiction

    const newStudent = await Student.create([payload], { session })
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create student')
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (err : any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

// create faculty
const crateFacultyIntoDb = async(password : string, payload : TFaculty) => {
  const userData : Partial<TUser> = {}
  // set user password 
  userData.password = password || (config.default_password as string);
  // set role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
      payload.academicDepartment,
    );

  if(!academicDepartment){
    throw new AppError(400, "Academic Department is not found")
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generatedFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }


}


const createAdminIntoDb = async (password : string, payload : Partial<TAdmin>) => {
  const userData : Partial<TUser> = {};

  // add password on user 
  userData.password = password || config.default_password; 

  // set role
  userData.role = "admin"

  const session = await mongoose.startSession();

  try{
    session.startTransaction();

    // set generated id
    userData.id = await generateAdminId();

    // create a user transition 1
    const newUser = await User.create([userData], {session});

    // create admin
    if(!newUser.length){
      throw new AppError(httpStatus.BAD_REQUEST, "User created faild")
    }

    // set id , _id as a user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], {session});

    await session.commitTransaction()
    session.endSession()
    
    return newAdmin;

  }catch(err : any){
    session.abortTransaction()
    session.endSession();
    throw new Error(err)
  }

}

export const UserServices = {
  createStudentIntoDb,
  crateFacultyIntoDb,
  createAdminIntoDb 
}
