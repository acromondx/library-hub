import { getAllRequests } from "@/queries/admin/request";
import AllRequestsSection from "@/components/admin/Sections/AllRequestsSection";

export default async function UserReservedBooks() {
  const requests = await getAllRequests();
  return <AllRequestsSection requests={requests} />;
}
