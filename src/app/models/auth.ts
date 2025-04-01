export class Register {
    userId: number = 0;
    emailId: string = '';
    password: string = '';
    fullName: string = '';
    mobileNo: string = '';
  }

  export class Login {
    emailId: string = '';
    password: string = '';
  }  
  
  export interface ILoginResponse {
    userId: number
    emailId: string
    password: string
    createdDate: string
    projectName: string
    fullName: string
    mobileNo: string
  }
  