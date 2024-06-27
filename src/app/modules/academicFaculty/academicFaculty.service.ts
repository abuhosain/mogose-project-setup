import { TAcademicFaculty } from './academicFacult.interface'
import { AcademicFaculty } from './academicFacult.model'

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllAcademicFacultiesFromDb = async () => {
  const result = await AcademicFaculty.find()
  return result
}

const getSingleAcademicFacultById = async (id: string) => {
  const result = await AcademicFaculty.findById({ _id: id })
  return result
}

const updateAcademicFacultyIntoDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultiesFromDb,
  getSingleAcademicFacultById,
  updateAcademicFacultyIntoDb,
}
