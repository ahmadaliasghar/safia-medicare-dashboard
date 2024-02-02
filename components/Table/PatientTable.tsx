import { Patient } from "@/types";
import Image from "next/image";
import Icon from "@/assets/images/Profile.jpg"

interface PatientTableProps {
    data: Patient[]; 
  }

const PatientTable: React.FC<PatientTableProps> = ({data}) => {

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default ">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black">
          Patients
        </h4>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium text-black p-3">Patient Name</p>
        </div>
        <div className="col-span-2  items-center sm:flex">
          <p className="font-medium text-black p-3">Age</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium text-black p-3">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black p-3">Contact</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium text-black p-3">Profit</p>
        </div>
      </div>

      {data?.map((patient, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md p-2">
                <Image
                  src={Icon}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black p-2">
                {patient.firstName + " " + patient?.lastName}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black p-2">
              {patient?.dateOfBirth}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black p-2">
              ${patient?.email}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black p-2">{patient?.contact}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3 p-2 text-black">$ {index}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientTable;
