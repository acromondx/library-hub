import { getCurrentUser } from "@/actions/user/auth";
import { UserAccountSection } from "@/components/user/Sections/UserAccountSection";

export default async function UserAccountPage() {
  const user = await getCurrentUser();
  return <UserAccountSection user={user} />;
}
