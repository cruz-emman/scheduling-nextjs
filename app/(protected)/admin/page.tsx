import { auth } from "@/auth";
import { AdminContainer } from "@/components/admin/admin-container";
import { LogoutButton } from "@/components/logout-button";

const AdminDashboard = async () => {
  const session = await auth();
  return (
    <AdminContainer />
  );
};

export default AdminDashboard;
