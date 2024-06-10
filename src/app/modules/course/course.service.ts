import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { CourseSearchableFields } from './course.constanse'
import { TCourse, TCourseFaculty } from './course.interface'
import { Course, CourseFaculty } from './course.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await courseQuery.modelQuery
  return result
}

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  )
  return result
}

const updateCourseIntoDbIntoDb = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // step 1 basic course info update
    const updatedBasicCourseUpdateInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updatedBasicCourseUpdateInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to update course')
    }

    // check if there is any course to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the deleted fields
      const deletedPrequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course)

      const deletedPrequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPrequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!deletedPrequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Faild to update course')
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      )

      const newPreRequisitesCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )

      if (!newPreRequisitesCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Faild to update course')
      }

      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      )

      return result
    }

    session.commitTransaction()
    session.endSession()
  } catch (err) {
    session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to updated course')
  }
}

const deleteCourseFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

const assingFacultiesWithCourseIntoDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  )
  return result
}

const removeFacultiesWithCourseFromDb = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  )
  return result
}

export const CourseServices = {
  createCourseIntoDb,
  getAllCoursesFromDb,
  getSingleCourseFromDb,
  deleteCourseFromDb,
  updateCourseIntoDbIntoDb,
  assingFacultiesWithCourseIntoDb,
  removeFacultiesWithCourseFromDb,
}
