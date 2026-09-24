import { PrismaClient, UserRole, EmploymentType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe-123!", 12);
  const organization = await prisma.organization.upsert({
    where: { slug: "zambia-hq" },
    update: {},
    create: { name: "Zambia HQ", slug: "zambia-hq", industry: "Professional Services", province: "Lusaka", city: "Lusaka" }
  });
  const user = await prisma.user.upsert({
    where: { email: process.env.SEED_ADMIN_EMAIL ?? "admin@zamconnect.local" },
    update: { passwordHash, name: "Kunda Mwansa" },
    create: { email: process.env.SEED_ADMIN_EMAIL ?? "admin@zamconnect.local", passwordHash, name: "Kunda Mwansa" }
  });
  await prisma.membership.upsert({ where: { userId_organizationId: { userId: user.id, organizationId: organization.id } }, update: { role: UserRole.COMPANY_ADMIN }, create: { userId: user.id, organizationId: organization.id, role: UserRole.COMPANY_ADMIN } });
  const department = await prisma.department.upsert({ where: { organizationId_name: { organizationId: organization.id, name: "People & Culture" } }, update: {}, create: { organizationId: organization.id, name: "People & Culture" } });
  const names = [["Thandi", "Mwamba", "People Partner"], ["Joseph", "Mumba", "Finance Manager"], ["Sarah", "Kabwe", "Learning Lead"], ["Martin", "Banda", "Operations Manager"]];
  for (let index = 0; index < names.length; index += 1) {
    const [firstName, lastName, jobTitle] = names[index];
    await prisma.employee.upsert({ where: { organizationId_employeeNumber: { organizationId: organization.id, employeeNumber: `ZC-${String(index + 1).padStart(3, "0")}` } }, update: {}, create: { organizationId: organization.id, departmentId: department.id, employeeNumber: `ZC-${String(index + 1).padStart(3, "0")}`, firstName, lastName, jobTitle, email: `${firstName.toLowerCase()}@zamconnect.local`, employmentType: EmploymentType.PERMANENT, startDate: new Date("2024-01-15") } });
  }
  console.log(`Seeded ${organization.name}. Login: ${user.email}`);
}

main().catch((error) => { console.error(error); process.exit(1); }).finally(() => prisma.$disconnect());
