import express from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultValidation } from "./academicFacultyValidation";

const router = express.Router();

router.post("/create-faculty",
 validateRequest(AcademicFacultValidation.createAcademicFacultValidationSchema),
 AcademicFacultyController.createAcadamicFaculty)

router.get("/:facultyId",
 AcademicFacultyController.getSingleAcademicFaculty)

router.patch("/:facultyId",
 validateRequest(AcademicFacultValidation.createAcademicFacultValidationSchema),
 AcademicFacultyController.updateAcademicFaculty)

 router.get("/", AcademicFacultyController.getAllAcademicFaculties)

export const AcademicFacultRoutes = router