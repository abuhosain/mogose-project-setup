import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { academicSemisterCodeMapper } from './academicSemister.constant'

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemisterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semister code')
  }
  const result = AcademicSemester.create(payload)
  return result
}

const getAllAcademicSemisteFromDb = async () => {
  const result = await AcademicSemester.find()
  return result
}

const getSingleAcademicSemisterFromDb = async (id: string) => {
  const result = AcademicSemester.findById({ _id: id })
  return result
}
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if ( payload.name && payload.code && academicSemisterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemisteFromDb,
  getSingleAcademicSemisterFromDb,
  updateAcademicSemesterIntoDB
}
