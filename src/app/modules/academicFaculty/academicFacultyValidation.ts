import { z } from 'zod'

const createAcademicFacultValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic Faculty must be string' }),
  }),
})
const updateAcademicFacultValidationSchema = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Academic Faculty must be string' }),
  }),
})

export const AcademicFacultValidation = {
  createAcademicFacultValidationSchema,
  updateAcademicFacultValidationSchema,
}
