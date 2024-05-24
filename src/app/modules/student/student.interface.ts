 
import { Model } from "mongoose"

 


export type TUserName =  {
    firstname: string
    middleName?: string
    lastName: string
  }

export type TGuardian = {
    
        fatherName : string;
        fatherOccuption : string;
        fatherContact : string;
        motherName : string;
        motherOccuption : string;
        motherContact : string;
}

export type TLocalGurdian = {
    name : string;
    occuption : string;
    contactNo : string;
    address : string;
}

export type TStudent = {
  id: string;
  password : string;
  name: TUserName;
  gender : "male" | "female" | "other";
  dateOfBirth? : string;
  email: string;
  contactNumber : string;
  emergencyContatNo : string;
  bloodGroup? : 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress : string;
  permamentAddress : string;
  gurdian : TGuardian;
  localGuardian : TLocalGurdian;
  profileImg? : string;
  isActive : "active" | "inActive",
  isDeleted : boolean
}

// for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id : string) : Promise<TStudent | null>
}






// for creating custom instance

// export type StudentMethod = {
//   isUserExists(id : string) :  Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethod>;