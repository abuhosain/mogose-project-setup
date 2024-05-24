 
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDb = async (studentData : TStudent) => {
    
    if(await Student.isUserExists(studentData.id)){
        throw new Error("user already exits")
    }
    const result = await Student.create(studentData); //built in static method



    // const student = new Student(studentData); // create an instance
   
    // if( await student.isUserExists(studentData.id)){
    //     throw new Error("user already exits")
    // }

    // const result = await student.save() // built in instant method
    return result;
}

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result
}

const getSingleStudentFromDb = async (id : string) => {
    // const result = await Student.findOne({id: id});
    const result = await Student.aggregate([{$match : {id : id}}])
    return result;
}

const deleteStudentFromDb = async (id : string) => {
    const result = await Student.updateOne({id}, {isDeleted : true})
    return result;
}

export const StudentService = {
    createStudentIntoDb,
    getAllStudentsFromDB,
    getSingleStudentFromDb,
    deleteStudentFromDb
}

