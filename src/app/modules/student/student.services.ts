import mongoose from 'mongoose'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import httpStatus from 'http-status'
import { TStudent } from './student.interface'
import { skip } from 'node:test'

const getAllStudentsFromDB = async (query : Record<string, unknown>) => {
  const studentSearchAbleField = ["email", "name.firstName", "presentAdress"];
  const queryObj = {...query}
  let searchTerm = "";
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string
  }

  const searchQuery = Student.find({
    $or : studentSearchAbleField.map(
      (field) => ({
        [field] : { $regex : searchTerm, $options : "i"}
      })
    )
  })

  // filtering
  const excludeField = ["searchTerm", "sort", "limit", "page", "fields"];
  excludeField.forEach(el => delete queryObj[el]);

  const filterQuery =  searchQuery.find(queryObj)
    .populate('admissiionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    // sorting
    let sort = "-createdAt";
    if(query.sort){
      sort = query.sort as string
    }

    const sortQuery =  filterQuery.sort(sort)

    // limit and page
    let page = 1
    let limit = 1;

    if(query.limit){
      limit = Number(query.limit)
    }

    if(query.page) { 
      page = Number(query.page)
      skip =  (page-1) *limit 
    }
    // pagination query
    const paginateQuery = sortQuery.skip(skip)
  
    // limit query
    const limitQuery =  paginateQuery.limit(limit);

    // fields
    let fields = "-__v";

    if(query?.fields){
      fields = (query.fields as string).split(",").join(" ")
    }

    const fieldQuery = await limitQuery.select(fields)

  return fieldQuery
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
