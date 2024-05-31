import { z } from 'zod'

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'password must be string' })
    .max(20, { message: 'passowrd can not be more than 20 characters' })
    .optional(),
  role: z.enum(['student', 'faculty', 'admin']),
})

export const userValidation = {
  userValidationSchema,
}
