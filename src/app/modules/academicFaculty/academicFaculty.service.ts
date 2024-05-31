import { TAcademicFaculty } from "./academicFacult.interface";
import { academicFaculty } from "./academicFacult.model";

const createAcademicFacultyIntoDb = async (payload : TAcademicFaculty) => {
    const result = await academicFaculty.create(payload);
    return result
}

const getAllAcademicFacultiesFromDb = async () => {
    const result = await academicFaculty.find(

    );
    return result
}

const getSingleAcademicFacultById = async(id : string) => {
    const result = await academicFaculty.findById({_id : id});
    return result
}

const updateAcademicFacultyIntoDb = async (id : string, payload : Partial<TAcademicFaculty>) => {
    const result = await academicFaculty.findOneAndUpdate({_id : id}, payload, {new : true});
    return result
}

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDb,
    getAllAcademicFacultiesFromDb,
    getSingleAcademicFacultById,
    updateAcademicFacultyIntoDb
}