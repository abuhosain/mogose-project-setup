import { AcademicDepartment } from './academicDapartment.model'
import { TAcademicDepartment } from './academicDepartment.interface'
const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload)
  return result
}

const getAllAcademicDepartmentsFromDb = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')
  return result
}

const getSingleAcademicDepartmenttById = async (id: string) => {
  const result = await AcademicDepartment.findById({ _id: id }).populate('academicFaculty')
  return result
}

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  )
  return result
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentsFromDb,
  getSingleAcademicDepartmenttById,
  updateAcademicDepartmentIntoDb,
}
