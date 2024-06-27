import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { SemesterRegestration } from '../semesterRegestration/semesterRegestration.model'
import { TOfferedCourse } from './offeredCourse.interface'
import { OfferedCourse } from './offeredCourse.model'
import { AcademicFaculty } from '../academicFaculty/academicFacult.model'
import { AcademicDepartment } from '../academicDepartment/academicDapartment.model'
import { Course } from '../course/course.model'
import { Faculty } from '../faculty/faculty.model'
import { hasTimeConflict } from './offeredCourse.utils'

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegestration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload

  //   check if the semester regestration is exists
  const isSemesterRegestrationExists =
    await SemesterRegestration.findById(semesterRegestration)
  if (!isSemesterRegestrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration is not found',
    )
  }

  const academicSemester = isSemesterRegestrationExists?.academicSemester

  //   check if the academicFaculty is exists
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty)
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty is not found')
  }

  //   check if the academicDepartment is exists
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment)
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department is not found')
  }

  //   check if the course is exists
  const isCourseExists = await Course.findById(course)
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found')
  }

  //   check if the faculty is exists
  const isFacultyExists = await Faculty.findById(faculty)
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found')
  }

  // check if the department is not belong to the faculty;
  const isDepartpentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  })
  if (!isDepartpentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `this ${isAcademicDepartmentExists.name} is not belong to the ${isAcademicFacultyExists.name}`,
    )
  }

  // check if the same offer course same section in the same regestered semester exists
  const isSameOffersCouseExistsWithSameRegesterSemesteWithSameSection =
    await OfferedCourse.findOne({
      semesterRegestration,
      course,
      section,
    })

  if (isSameOffersCouseExistsWithSameRegesterSemesteWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist`,
    )
  }

  // get the shedule of faculties
  const assignedShedule = await OfferedCourse.find({
    semesterRegestration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')
  console.log(assignedShedule)

  const newSchedule = {
    days,
    startTime,
    endTime,
  }
  if (hasTimeConflict(assignedShedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not availble for at that try another time or day',
    )
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester })
  return result
  // return null
}

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'days' | 'startTime' | 'endTime' | 'faculty'>,
) => {
  const { faculty, days, startTime, endTime } = payload

  // is offered coursed exist
  const isOfferedCourseExist = await OfferedCourse.findById(id)
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course is not found')
  }

  // is faculty exist
  const isFacultyExist = await Faculty.findById(faculty)
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty  is not found')
  }

  const semesterRegestration = isOfferedCourseExist?.semesterRegestration;
  if (!semesterRegestration) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester regestration is not found')
  }
  const semesterRegestrationStatus = await SemesterRegestration.findById(semesterRegestration);
  if(semesterRegestrationStatus?.status !== "UPCOMING" ){
    throw new AppError(httpStatus.NOT_FOUND, `You cant update because it is as ${semesterRegestrationStatus?.status}`)
  }

  // get the shedule of faculties
  const assignedShedule = await OfferedCourse.find({
    semesterRegestration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')
  // console.log(assignedShedule)

  const newSchedule = {
    days,
    startTime,
    endTime,
  }
  if (hasTimeConflict(assignedShedule, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This faculty is not availble for at that try another time or day',
    )
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  })

  return result;
}

export const OfferedCourseServices = {
  createOfferedCourseIntoDb,
  updateOfferedCourseIntoDB,
}
