import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { TUserRole } from '../modules/user/user.interface'
import { User } from '../modules/user/user.model'

const auth = (...requirdRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Your are not authorized')
    }

    // checkin if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload
    const { role, userId, iat } = decoded

    const user = await User.isUserExistsByCustomId(userId)
    console.log(user)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This is user is not found')
    }

    //   // checking if the user is already deleted
    const isDeleted = user?.isDeleted
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This is user is deleted')
    }

    //   // checkin isUser was blocked
    const isBlocked = user?.status
    if (isBlocked === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This is user is blocked')
    }

    if (
      user.passwordChangesAt &&
      User.isJwtIssuedBeforePasswordChanged(
        user.passwordChangesAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Your are not authorized')
    }

    if (requirdRoles && !requirdRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Your are not authorized')
    }

    req.user = decoded as JwtPayload
    next()

    // invalid token
    // jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    //   function (err, decoded) {
    //     if (err) {
    //       throw new AppError(
    //         httpStatus.UNAUTHORIZED,
    //         'Your are not authorized',
    //       )
    //     }

    //     // const role = (decoded as JwtPayload).role;
    //     // if(requirdRoles && !requirdRoles.includes(role)){
    //     //   throw new AppError(
    //     //     httpStatus.UNAUTHORIZED,
    //     //     'Your are not authorized',
    //     //   )
    //     // }

    //     // req.user = decoded as JwtPayload;
    //     // next()
    //   },
    // )
  })
}

export default auth
