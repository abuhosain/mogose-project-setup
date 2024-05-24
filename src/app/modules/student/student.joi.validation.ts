import Joi from 'joi'
const userNameValidationSchema = Joi.object({
  firstname: Joi.string()
    .trim()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/) // Ensure the first letter is uppercase and the rest are lowercase
    .messages({
      'string.pattern.base':
        'First name must start with an uppercase letter and followed by lowercase letters',
      'any.required': 'First name is required',
      'string.max': 'First name cannot exceed 20 characters',
    }),
  middleName: Joi.string().allow(''), // Optional field
  lastName: Joi.string().required().messages({
    'any.required': 'Last name is required',
  }),
})

// Define the guardian schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': 'Father name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': 'Father occupation is required',
  }),
  fatherContact: Joi.string().required().messages({
    'any.required': 'Father contact is required',
  }),
  motherName: Joi.string().required().messages({
    'any.required': 'Mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': 'Mother occupation is required',
  }),
  motherContact: Joi.string().required().messages({
    'any.required': 'Mother contact is required',
  }),
})

// Define the localGuardian schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'any.required': 'Local guardian occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local guardian address is required',
  }),
})

// Define the student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required',
  }),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only':
      'The gender field must be one of the following: male, female, or other',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.date().iso().messages({
    'date.format': 'Date of Birth must be in ISO format (YYYY-MM-DD)',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  contactNumber: Joi.string().required().messages({
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only':
        'Blood group must be one of the following: A+, A-, B+, B-, AB+, AB-, O+, O-',
    }),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().messages({
    'string.uri': 'Profile image must be a valid URI',
  }),
  isActive: Joi.string()
    .valid('active', 'inActive')
    .default('active')
    .messages({
      'any.only': 'isActive must be one of the following: active, inActive',
    }),
})

export default studentValidationSchema
