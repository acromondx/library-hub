import { getAllUsers } from "@/actions/admin/users";
import { AddOrUpdateUserForm } from "@/components/admin/Forms/AddUserForm";
import { AllUsersSection } from "@/components/admin/Sections/AllUsersSection";
import { DashboardHeader } from "@/components/shared/DashboardHeader";
import { LinkButton } from "@/components/shared/buttons";

export default async function Dashboard() {
  const users = await getAllUsers();
  return (
    <>
      <DashboardHeader title="All users">
        <LinkButton title="New" href="/admin/users/new" />
      </DashboardHeader>
      <AllUsersSection users={users} />
    </>
  );
}
