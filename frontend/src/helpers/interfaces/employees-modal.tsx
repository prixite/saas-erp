export interface Employee {
  name: string;
  contact_number: number;
  nic: number;
  emergency_contact_number: number;
  date_of_joining: Date;
  organization: number;
  type: number;
  department: number;
}
export interface EmployeeData {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  };
  contact_number: string;
  date_of_joining: string;
  nic: string;
  designation: string;
  degrees: number[];
  emergency_contact_number: string;
  organization: number;
  type: number;
  department: number;
  org_id: string;
}
export interface EmployeeDoc {
  name: string;
  type: number;
  document_url: string;
}
