import { LuLayoutDashboard } from "react-icons/lu";
import { TbCheckupList } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { LiaDiagnosesSolid } from "react-icons/lia";
import { MdMedicalServices } from "react-icons/md";
import { SlCalender } from "react-icons/sl";


export const links = [
    {
        label: 'Dashboard',
        path: '/',
        icon: <LuLayoutDashboard size={20}/>
    },
    {
        label: 'Appointments',
        path: '/appointments',
        icon: <TbCheckupList size={20}/>
    },
    {
        label: 'Doctors',
        path: '/doctors',
        icon: <FaUserDoctor size={20}/>
    },
    {
        label: 'Patients',
        path: '/patients',
        icon:<IoIosPeople size={20}/>
    },
    {
        label: 'Diagnose Patient',
        path: '/diagnose',
        icon:<LiaDiagnosesSolid size={20}/>
    },
    {
        label: 'Services',
        path: '/services',
        icon:<MdMedicalServices size={20}/>
    },
    {
        label: 'Calender',
        path: '/calender',
        icon:<SlCalender size={20}/>
    },
]