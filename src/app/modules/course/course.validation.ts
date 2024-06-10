import { z } from "zod";

const preRequisiteValidationSchema = z.object({
    course : z.string(),
    isDeleted : z.boolean().optional()
})

const courseValidationSchema = z.object({
    body : z.object({
        title : z.string(),
        prefix : z.string(),
        code : z.number(),
        credits : z.number(),
        preRequisiteCourses : z.array(preRequisiteValidationSchema).optional(),
        isDeleted : z.boolean().optional()
    })
})


const updatedPreRequisiteValidationSchema = z.object({
    course : z.string(),
    isDeleted : z.boolean().optional()
})

const updateCourseValidationSchema = z.object({
    body : z.object({
        title : z.string().optional(),
        prefix : z.string().optional(),
        code : z.number().optional(),
        credits : z.number().optional(),
        preRequisiteCourses : z.array(updatedPreRequisiteValidationSchema).optional(),
        isDeleted : z.boolean().optional()
    })
})



const facultiesWithZodValidationSchema = z.object({
   body: z.object({
    faculties : z.array(z.string())
   })
})
 

export const CourseValidationSchema = {
    courseValidationSchema,
    updateCourseValidationSchema,
    facultiesWithZodValidationSchema
}