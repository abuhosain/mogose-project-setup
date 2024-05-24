import { Request, Response } from 'express'
import { StudentService } from './student.services'
import { studentValidationSchema } from './student.zod.validation';
 
 
// import studentValidationSchema from './student.validation';
 
 

const createStudent = async (req: Request, res: Response) => {
  try {

// creating a student schema using zod
    


    const student = req.body.student;

    const zodParseData =  studentValidationSchema.parse(student);

    // const {error, value} =  studentValidationSchema.validate(student)
    // console.log({error});
    // console.log({value})

    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: 'student is faile to created',
    //     error : error.details,
    //   })
    // }

    // will call services func to send this data
    const result = await StudentService.createStudentIntoDb(zodParseData)
    // send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    })
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message || 'student is faile to created',
      error: error,
    })
  }
}

const getAllStudent = async (req : Request, res : Response) => {
  try{
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success : true,
      message : "Student get successfully",
      data : result
    });
  }catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message || 'student is faile to created',
      error: error,
    })
  }
}

const getSingleStudent = async (req : Request, res : Response) => {
  try{
    const {studentId} = req.params;
  const result = await StudentService.getSingleStudentFromDb(studentId);
  res.status(200).json({
    success : true,
    message : "get single student data successfully",
    data : result
  })
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message || 'student is faile to created',
      error: error,
    })
  }
}


const deleteStudent = async (req : Request, res : Response) => {
  try{
    const {studentId} = req.params;
    const result = await StudentService.deleteStudentFromDb(studentId);
    res.status(200).json({
      success : true,
      message : "get single student data successfully",
      data : result
    })

  }catch(error : any){
    res.status(500).json({
      success: false,
      message: error.message || 'student is faile to created',
      error: error,
    })
  }
}

export const StudentController = {
    createStudent,
    getAllStudent,
    getSingleStudent,
    deleteStudent,
}