export interface Employee {
  first_name: string;
  last_name: string;
  contact_number: string;
  id: number;
  image: string;
  org_id: string;
  date_of_joining: string;
}
export interface Education {
  program: {
    id: string;
    name: string;
  };
  institute: {
    id: string;
    name: string;
  };
  year: string;
}
export interface Experience {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
  };
  start_date: string;
  end_date: string;
}
export type Manage = {
  id: string;
  name: string;
};
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
    default_role: number;
  };
  total_experience: string;
  benefits: Benefit[];
  experience: Experience[];
  degrees: Education[];
  contact_number: string;
  date_of_joining: string;
  nic: string;
  manages: Manage[];
  managing: Manage[];
  designation: string;
  emergency_contact_number: string;
  organization: number;
  type: {
    id: number;
    title: string;
  };
  manager?: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
  org_id: string;
  salary: number;
  currency: {
    id: number;
    code: string;
  };
  user_allowed: boolean;
}
export interface Doc {
  id: number;
  name: string;
  type: string;
  document_url: string;
}
export interface TeamMembers {
  id: number;
  image: string;
  contact_number: string;
  date_of_joining: string;
  first_name: string;
  last_name: string;
  org_id: string;
}
export interface AssetsTypes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeDoc {
  type: string;
  docs: Doc[];
}

interface AllowedModules {
  member_modules: string[];
  admin_modules: string[];
  owner_modules: string[];
}
export interface User {
  image: string;
  email: string;
  first_name: string;
  emp_id: number;
  headline: string;
  is_superuser: boolean;
  last_name: string;
  organization: string;
  contact_number: string;
  allowed_modules: AllowedModules;
}
export interface Flags {
  show_users_module: string;
  show_employees_module: string;
  show_payroll_module: string;
  show_accounts_module: string;
  show_dashboard_module: boolean;
  show_setting_module: string;
}
export interface EmployeementTypes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface CompaniesTypes {
  id: number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
}
export interface ProgramsTypes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface InstituteTypes {
  id: number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
}
export interface roleTypes {
  id: number;
  name: string;
  permission: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}
export interface departmentsTypes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface standupTypes {
  id: number;
  name: string;
  created_at: string;
  team: string;
}
export interface EmployeeBasic {
  id: number;
  name: string;
  image: string;
  department: string;
}
export interface teamTypes {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  members: EmployeeBasic;
}
export interface AttendanceTypes {
  employee: EmployeeBasic;
  time_in: string;
  time_out: string;
}

export interface AttendanceQueryTypes {
  id?: number;
  interval?: string;
  start_date?: string;
  end_date?: string;
}
export interface standupTypesEmp {
  id: number;
  name: string;
}
export interface standupUpdatesTypes {
  id: number;
  time: string;
  date: string;
  status: string;
  work_done_yesterday: string;
  work_to_do: string;
  blockers: string;
  standup: standupTypesEmp;
  employee: EmployeeBasic;
  created_at: string;
  updated_at: string;
}
export interface Benefits {
  id: number;
  name: string;
  created_at: string;
}

export interface EmployeeLeavesParameters {
  hr_comment: string;
  status: string;
  leave_type: string;
}
export interface empLeaves {
  id: number;
  created_at: string;
  description: string;
  employee: EmployeeBasic;
  hr_comment: string;
  status: string;
  updated_at: string;
  updated_by: null;
  organization: number;
  leave_from: string;
  leave_to: string;
  leave_type: string;
}
