import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function AddTaskLayout({ children }) {
  return (

    // </div>
    <div className="flex flex-col ">
      <Navbar />

      <div className="flex flex-row ">
        <Sidebar />

        <div className="flex-1 p-6 md:p-12 bg-slate-50/50">
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  );
}
