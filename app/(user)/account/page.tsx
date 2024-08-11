import { UserAccountSection } from "@/components/user/Sections/UserAccountSection";
import { getUser, getUserById } from "@/queries/user/user";
import { User } from "@prisma/client";

export default async function UserAccountPage() {
  const userId = await getUser();
  const user = await getUserById(userId);
  return <UserAccountSection user={user as User} />;
}
