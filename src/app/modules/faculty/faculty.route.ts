import express from "express"
import { FacultyControllers } from "./faculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateFacultyValidationSchema } from "./faculty.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constance";

const router = express.Router();
// single data
router.get("/:id", FacultyControllers.getSingleFaculty)

// update single data
router.patch("/:id", validateRequest(updateFacultyValidationSchema), FacultyControllers.updateFacaulty)

// delete single faculty
router.delete("/:id", FacultyControllers.deleteFaculty)
 
// get all faculty
router.get('', auth(USER_ROLE.admin, USER_ROLE.faculty), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router