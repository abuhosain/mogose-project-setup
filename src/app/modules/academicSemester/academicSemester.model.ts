import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemister.constant'

export const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  year: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode,
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
})

academicSemesterSchema.pre('save', async function (next) {
  const isSemisterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  })

  if (isSemisterExists) {
    throw new Error('Semister is already exists')
  } else {
    next()
  }
})

export const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
)
