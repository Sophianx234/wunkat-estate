'use client'
import { useDashStore } from "../store/dashboard-store";
import MobileNavbar from "./_components/MobileNavbar";
import NotificationList from "./_components/Notifications";
import Sidebar from "./_components/SideNav";
import Topbar from "./_components/Topbar";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const {openNotifications} = useDashStore()
  return (
    <div className="bg-gray-50">
      {/* Fixed Sidebar */}
      
        <Sidebar />
      

      {/* Fixed Topbar */}
      <header className="fixed  left-64 top-0 right-0 h-16 bg-white shadow z-40">
        <Topbar />
      </header>
      {openNotifications && <NotificationList/>}

      {/* Scrollable Main Content */}
      <main className="sm:pl-64 sm:pt-28 pb-24 pt-24  sm:h-screen  overflow-y-auto sm:px-8 sm:py-6">
        {children}
      </main>
      <MobileNavbar/>
    </div>
  );
}

export default Layout;
