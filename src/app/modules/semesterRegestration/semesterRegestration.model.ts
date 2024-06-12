import mongoose, { Schema } from 'mongoose'
import { TSemesterRegestration } from './semestarRegestration.interface'
import { semesterRegestrationStatus } from './academicRegestration.constant'

const semesterRegestrationSchema = new mongoose.Schema<TSemesterRegestration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: semesterRegestrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
)

export const SemesterRegestration = mongoose.model<TSemesterRegestration>(
  'SemesterRegestration',
  semesterRegestrationSchema,
)
