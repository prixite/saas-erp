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
export type Benefit = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
export interface EmployeeData {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    contact_number: string;
  };
  total_experience: string;
  benefits: Benefit[];
  experience: Experience[];
  degrees: Education[];
  contact_number: string;
  date_of_joining: string;
  nic: string;
  designation: string;
  emergency_contact_number: string;
  organization: number;
  type: number;
  manager?: string;
  department: number;
  org_id: string;
}
export interface Doc {
  id: number;
  name: string;
  type: string;
  document_url: string;
}
export interface EmployeeDoc {
  type: string;
  docs: Doc[];
}

export interface User {
  image: string;
  email: string;
  first_name: string;
  headline: string;
  is_superuser: boolean;
  last_name: string;
  organization: string;
}
export interface Flags {
  show_users_module: string;
  show_employees_module: string;
  show_payroll_module: string;
  show_accounts_module: string;
  show_dashboard_module: boolean;
  show_setting_module: string;
}
