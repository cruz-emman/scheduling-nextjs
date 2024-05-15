import { AdminWrapper } from "@/components/admin/admin-wrapper";
import { Navbar } from "@/components/admin/navbar";
import { Sidebar } from "@/components/admin/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col gap-y-3">
      <Navbar />
      <AdminWrapper>
        <Sidebar />
        {children}
      </AdminWrapper>
    </div>
  );
};

export default AdminLayout;
