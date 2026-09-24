import "next-auth";

declare module "next-auth" {
  interface Session { user: { id: string; organizationId?: string; role?: string; name?: string | null; email?: string | null; image?: string | null } }
  interface User { organizationId?: string; role?: string }
}
