import { TSchedule } from './offeredCourse.interface'

export const hasTimeConflict = (
  assignedSchedule: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignedSchedule) {
    const existingStartTime = new Date(`1979-01-01T${schedule.startTime}`)
    const existingEndTime = new Date(`1979-01-01T${schedule.endTime}`)
    const newStartingTime = new Date(`1979-01-01T${newSchedule.startTime}`)
    const newEndTime = new Date(`1979-01-01T${newSchedule.endTime}`)

    if (newStartingTime < existingEndTime && newEndTime > existingStartTime) {
      return true
    }
    return false
  }
}
