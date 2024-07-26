import { getAllRequests } from "@/queries/admin/request";
import { getUser } from "@/queries/user/user";
import AllRequestsSection from "@/components/admin/Sections/AllRequestsSection";

export default async function UserReservedBooks() {
  const user = await getUser();
  const requests = await getAllRequests();
  return <AllRequestsSection requests={requests} />;
}
