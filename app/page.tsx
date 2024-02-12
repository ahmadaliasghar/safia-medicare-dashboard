import AcceptAppointmentView from "@/views/AcceptAppointmentView";
import NewAppointmentView from "@/views/NewAppointmentView";
import TodayAppointmentView from "@/views/TodayAppointmentView";
import AnalyticsCard from "../components/AnalyticsCard";
import Overview from "@/components/Overview";
import Piechart from "@/components/Piechart";
import { LuBed } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUsersLine } from "react-icons/fa6";
import { LuCircleDollarSign } from "react-icons/lu";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./diagnose/compnents/Document";



export default function Home() {

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnalyticsCard heading="Patients" style="bg-[#F4F7FDff] text-[#2961E2ff]" color="" value={150} icon={<FaUsersLine size={34} />} />
          <AnalyticsCard heading="Total Staff" style="bg-[#F2F9FFff] text-[#0496FFff]" color="#0496FFff" value={10} icon={<FaUserDoctor size={34} />} />
          <AnalyticsCard heading="Patients being treated" style="bg-[#FFF7F2ff] text-[#FF9345ff]" color="#FF9345ff" value={55} icon={<LuBed size={34} />} />
          <AnalyticsCard heading="Avg. Cost" value={350} style="bg-[#F9F9F9ff] text-[#273245ff]" color="#273245ff"icon={<LuCircleDollarSign size={34} />}  />
        </div>
        <div className="flex justify-between gap-2 mt-8">
          <div className="w-2/3 bg-[#F2F9FFff] rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <Overview />
          </div>
          <div className="w-1/3 bg-[#F2F9FFff] rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Gender Distribution</h2>
            <Piechart />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Today's Appointments</h2>
          <TodayAppointmentView/>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Accept Appointments</h2>
          <AcceptAppointmentView/>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">New Appointments</h2>
          <NewAppointmentView/>
        </div>

      </div>
    </div>
  );
}
