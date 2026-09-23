from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session
from .db import get_db
from .models import Employee, EmployeeSkill
from .schemas import DashboardSummary, EmployeeCreate, EmployeeRead

router = APIRouter()

@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "zamconnect-api"}

@router.get("/api/v1/dashboard/summary", response_model=DashboardSummary)
def dashboard_summary(db: Session = Depends(get_db)) -> DashboardSummary:
    employees = db.scalar(select(func.count(Employee.id))) or 0
    skills = db.scalar(select(func.count(EmployeeSkill.id))) or 0
    return DashboardSummary(
        employees=employees,
        skills_mapped=skills,
        skills_gaps=max(0, round(employees * 0.15)),
        training_needs=max(0, round(employees * 0.11)),
        critical_skill_risks=max(0, round(employees * 0.03)),
        internal_talent_matches=max(0, round(employees * 0.06)),
    )

@router.get("/api/v1/employees", response_model=list[EmployeeRead])
def list_employees(db: Session = Depends(get_db)) -> list[Employee]:
    return list(db.scalars(select(Employee).order_by(Employee.last_name)).all())

@router.post("/api/v1/employees", response_model=EmployeeRead, status_code=201)
def create_employee(payload: EmployeeCreate, db: Session = Depends(get_db)) -> Employee:
    employee = Employee(**payload.model_dump())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee
