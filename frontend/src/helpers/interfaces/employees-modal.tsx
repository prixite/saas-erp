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
export interface Education {
  program: string;
  institute: string;
  year: string;
}
export interface Experience {
  title: string;
  company: string;
  start_date: string;
  end_date: string;
}
export interface EmployeeData {
  id: number;

  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  total_experience: string;
  benefits: string[];
  experience: Experience[];
  degrees: Education[];
  contact_number: string;
  date_of_joining: string;
  nic: string;
  designation: string;
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

export interface User {
  avatar: string;
  email: string;
  first_name: string;
  headline: string;
  is_superuser: boolean;
  last_name: string;
  organization: string;
}
