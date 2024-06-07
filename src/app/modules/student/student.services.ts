import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import httpStatus from 'http-status'
import { TStudent } from './student.interface'

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissiionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({id: id});
  const result = await Student.findOne({id})
    .populate('admissiionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}


const UpdatedStudentIntoDb = async (id: string, payload : Partial<TStudent>) => {
  // const result = await Student.findOne({id: id});
  const {name, localGuardian, gurdian, ...remainingStudentData} = payload;

  const modifiedUpdateData : Record<string, unknown> = {
    remainingStudentData
  }

  if(name && Object.keys(name).length){
    for ( const [key, value] of Object.entries(name)){
      modifiedUpdateData[`name.${key}`] = value
    }
  }
  if(gurdian && Object.keys(gurdian).length){
    for ( const [key, value] of Object.entries(gurdian)){
      modifiedUpdateData[`gurdian.${key}`] = value
    }
  }
  if(localGuardian && Object.keys(localGuardian).length){
    for ( const [key, value] of Object.entries(localGuardian)){
      modifiedUpdateData[`localGuardian.${key}`] = value
    }
  }

  console.log(modifiedUpdateData)
  const result = await Student.findOneAndUpdate({id}, modifiedUpdateData, {new : true, runValidators : true})
    .populate('admissiionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();

  try{
    session.startTransaction()
    const deletedStudet = await Student.findOneAndUpdate(
      { id },
     { isDeleted: true },
     {
      new : true, session
     }
    )
    if(!deletedStudet){
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to delete student")
    }

    const deletedUser = await User.findOneAndUpdate(
      {id},
      {isDeleted : true},
      {new : true, session}
    )

    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST,"Faild to deleted User")
    }

    await session.commitTransaction()
    await session.endSession()
    return deletedStudet;

  }catch(err){
    await session.abortTransaction()
    await session.endSession()
    throw new Error("Faild to delete student")
  }

 
}

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDb,
  deleteStudentFromDb,
  UpdatedStudentIntoDb
}
