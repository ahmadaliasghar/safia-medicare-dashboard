import NewAppointmentView from "@/views/NewAppointmentView";
import TodayAppointmentView from "@/views/TodayAppointmentView";

export default function Home() {
  return (
    <div className="min-h-[100vh] mt-20 bg-black">
      <TodayAppointmentView/>
      <NewAppointmentView/>
    </div>
  )
}
