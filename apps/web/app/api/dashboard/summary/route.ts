import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireOrganization } from "@/lib/session";

export async function GET() {
  try {
    const { organizationId } = await requireOrganization();
    const [employees, skillsMapped, skillsGaps, trainingNeeds, criticalSkillRisks] = await Promise.all([
      db.employee.count({ where: { organizationId } }),
      db.employeeSkill.count({ where: { employee: { organizationId } } }),
      db.skill.count({ where: { organizationId } }),
      db.trainingRecord.count({ where: { employee: { organizationId }, status: { in: ["ENROLLED", "IN_PROGRESS"] } } }),
      db.skill.count({ where: { organizationId, employees: { none: {} } } })
    ]);
    return NextResponse.json({ employees, skills_mapped: skillsMapped, skills_gaps: skillsGaps, training_needs: trainingNeeds, critical_skill_risks: criticalSkillRisks, internal_talent_matches: 0 });
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}
