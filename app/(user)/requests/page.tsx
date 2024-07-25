import { getUserRequests } from "@/queries/user/requests";
import UserRequestsSection from "@/components/user/Sections/UserRequestsSection";

export default async function page() {
  const userRequests = await getUserRequests();
  return <UserRequestsSection requests={userRequests} />;
}
