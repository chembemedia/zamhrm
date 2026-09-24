import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "database" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
  providers: [CredentialsProvider({ name: "Email and password", credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } }, async authorize(credentials) {
    if (!credentials?.email || !credentials.password) return null;
    const user = await db.user.findUnique({ where: { email: credentials.email.toLowerCase() }, include: { memberships: { where: { status: "ACTIVE" }, orderBy: { createdAt: "asc" }, take: 1 } } });
    if (!user?.passwordHash || !user.memberships[0]) return null;
    if (!(await bcrypt.compare(credentials.password, user.passwordHash))) return null;
    return { id: user.id, email: user.email, name: user.name, organizationId: user.memberships[0].organizationId, role: user.memberships[0].role };
  } })],
  callbacks: { async session({ session, user }) { if (session.user && user) { const membership = await db.membership.findFirst({ where: { userId: user.id, status: "ACTIVE" }, orderBy: { createdAt: "asc" } }); session.user.id = user.id; session.user.organizationId = membership?.organizationId; session.user.role = membership?.role; } return session; } }
};
