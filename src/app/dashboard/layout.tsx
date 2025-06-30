import Sidebar from "./_components/SideNav";
import Topbar from "./_components/Topbar";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-gray-50">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow z-50">
        <Sidebar />
      </aside>

      {/* Fixed Topbar */}
      <header className="fixed left-64 top-0 right-0 h-16 bg-white shadow z-40">
        <Topbar />
      </header>

      {/* Scrollable Main Content */}
      <main className="pl-64 pt-16 h-screen overflow-y-auto px-8 py-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;
