import {z} from "zod";
import { semesterRegestrationStatus } from "./academicRegestration.constant";
 

const createSemesterRegestrationValidationSchema = z.object({
    body : z.object({
        academicSemester : z.string(),
        status : z.enum([...semesterRegestrationStatus] as [string, ...string[]]),
        startDate : z.string().datetime(),
        endDate : z.string().datetime(),
        minCredit : z.number(),
        maxCredit : z.number()
    })
})
const updateSemesterRegestrationValidationSchema = z.object({
    body : z.object({
        academicSemester : z.string().optional(),
        status : z.enum([...semesterRegestrationStatus] as [string, ...string[]]).optional(),
        startDate : z.string().datetime().optional(),
        endDate : z.string().datetime().optional(),
        minCredit : z.number().optional(),
        maxCredit : z.number().optional()
    })
})


export const SemesterRegestrationValidations = {
    createSemesterRegestrationValidationSchema,
    updateSemesterRegestrationValidationSchema
}