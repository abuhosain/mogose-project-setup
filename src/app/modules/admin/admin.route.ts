import express from "express"
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middleware/validateRequest";
import { updateAdminValidationSchema } from "./admin.validation";

const router = express.Router();

// all admin data
router.get("", AdminControllers.getAllAdmin);

// single admin
router.get("/:id", AdminControllers.getSingleAdmin)

// update admin
router.patch("/:id",validateRequest(updateAdminValidationSchema), AdminControllers.updateAdmin)

// delete admin
router.delete("/:id", AdminControllers.deleteAdmin)

export const AdminRoutes = router