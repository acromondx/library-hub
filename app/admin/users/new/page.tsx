import { AddOrUpdateUserForm } from "@/components/admin/Forms/AddUserForm";
import { BackButton } from "@/components/shared/buttons";

export default function Dashboard() {
  return (
    <div className="max-w-4xl pb-4">
      <BackButton href="/admin/users" />
      <AddOrUpdateUserForm />
    </div>
  );
}
