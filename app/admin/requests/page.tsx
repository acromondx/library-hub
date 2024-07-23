import { getAllRequests } from "@/actions/admin/requests";
import { getUser } from "@/actions/user/user";
import AllRequestsSection from "@/components/admin/Sections/AllRequestsSection";

export default async function UserReservedBooks() {
  const user = await getUser();
  const requests = await getAllRequests();
  return <AllRequestsSection requests={requests} />;
}
