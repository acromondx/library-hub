import { getUserFromSession } from "@/actions/user/auth";
import { UserAccountSection } from "@/components/user/Sections/UserAccountSection";

export default async function UserAccountPage() {
  const user = await getUserFromSession();
  return <UserAccountSection user={user} />;
}
