/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generatedStudentId } from './userr.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

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
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error("Faild to create student")
  }
}

export const UserServices = {
  createStudentIntoDb,
}
