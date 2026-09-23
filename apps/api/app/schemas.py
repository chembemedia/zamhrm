from datetime import date
from pydantic import BaseModel, ConfigDict, EmailStr

class EmployeeCreate(BaseModel):
    company_id: str
    employee_id: str
    first_name: str
    last_name: str
    email: EmailStr
    job_title: str
    department: str | None = None
    start_date: date | None = None

class EmployeeRead(EmployeeCreate):
    id: str
    status: str
    model_config = ConfigDict(from_attributes=True)

class DashboardSummary(BaseModel):
    employees: int
    skills_mapped: int
    skills_gaps: int
    training_needs: int
    critical_skill_risks: int
    internal_talent_matches: int
