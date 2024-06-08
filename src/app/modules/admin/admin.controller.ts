import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
// import { Admin } from "./admin.model";
import { AdminServices } from './admin.service'

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminFromDb(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all admin succesfully',
    data: result,
  })
})

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.getSingleAdminFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single admin succesfully',
    data: result,
  })
})

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const { admin } = req.body
  const result = await AdminServices.updateAdminIntoDB(id, admin)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated succesfully',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.deleteAdminFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted succesfully',
    data: result,
  })
})
export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
