import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TSemesterRegestration } from './semestarRegestration.interface'
import { SemesterRegestration } from './semesterRegestration.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { RegestrationStatus } from './academicRegestration.constant'

const createSemseterRegestrationIntoDB = async (
  payload: TSemesterRegestration,
) => {
  const academicSemester = payload?.academicSemester

  //   check is academic semseter already exists in semestr regestration
  const isSemesterRegestrationExists = await SemesterRegestration.findOne({
    academicSemester,
  })

  if (isSemesterRegestrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Academic Semester is already exists',
    )
  }

  // check if there any regestered semester that is already  "UPCOMING" | "ONGOING"
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegestration.findOne({
      $or: [{ status: RegestrationStatus.UPCOMING }, { status: RegestrationStatus.ONGOING }],
    })

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already ${isThereAnyUpcomingOrOngoingSemester.status} a regestered semester`,
    )
  }

  // check   the academic semester is already regestered academic semester
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester)
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'this Academic semester not found')
  }

  const result = SemesterRegestration.create(payload)
  return result
}
const getAllSemseterRegestrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegestrationQuery = new QueryBuilder(
    SemesterRegestration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegestrationQuery.modelQuery
  return result
}

const getSingleSemseterRegestrationFromDB = async (id: string) => {
  const result =
    await SemesterRegestration.findById(id).populate('academicSemester')
  return result
}
const updateSemseterRegestrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegestration>,
) => {
  //   check is  semseter regestration already exists in semestr regestration
  const isSemesterRegestrationExists = await SemesterRegestration.findById(id)

  if (!isSemesterRegestrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      '  Semester regestration  not exitst ',
    )
  }

  // if the requested semester is already updated then we cant changes any thing
  const currentSemesterStatus = isSemesterRegestrationExists?.status
  const requstedStatus = payload?.status

  if (currentSemesterStatus === RegestrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Semester is already ${currentSemesterStatus}`,
    )
  }

  //   upcoming => ongoing => ended;
  if (currentSemesterStatus === RegestrationStatus.UPCOMING && requstedStatus === RegestrationStatus.ENDED) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `You can not directly change from ${currentSemesterStatus} to ${requstedStatus}`,
    )
  }

  if (currentSemesterStatus === RegestrationStatus.ONGOING && requstedStatus === RegestrationStatus.UPCOMING ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `You can not directly change from ${currentSemesterStatus} to ${requstedStatus}`,
    )
  }

  const result = await SemesterRegestration.findByIdAndUpdate(id, payload,
    {
        new : true,
        runValidators : true
    }
  )
  return result;
}

export const SemesterRegestrationServices = {
  createSemseterRegestrationIntoDB,
  getAllSemseterRegestrationFromDB,
  getSingleSemseterRegestrationFromDB,
  updateSemseterRegestrationIntoDB,
}
