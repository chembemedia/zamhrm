import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export const getSession = () => getServerSession(authOptions);

export async function requireOrganization() {
  const session = await getSession();
  if (!session?.user?.id || !session.user.organizationId) throw new Error("UNAUTHORIZED");
  return { session, organizationId: session.user.organizationId };
}
