import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";



export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-hidden">
      <Navbar />

      <div className="flex h-[calc(100vh-56px)] w-full max-w-full overflow-hidden">

        <div className="hidden md:block h-full shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 h-full overflow-hidden bg-white dark:bg-[#1C1F22] transition-colors duration-200 min-w-0">
          {children}
        </div>
      </div>
    </div>

  );
}
