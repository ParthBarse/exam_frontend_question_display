import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { baseurl } from "../../utils/domain";

const View_medical_certificate = () => {
  const [student, setStudent] = useState(null);
  const params = useParams();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    Date.now()
  );

  const getStudent = async () => {
    const SID = params.id;
    const res = await axios({
      method: "get",
      url: `https://${baseurl}/getStudent?sid=${SID}`,
    });
    console.log();
    setStudent(res.data);
  };
  useEffect(() => {
    getStudent();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 px-48 w-full h-screen gap-4 relative">
      <button
        onClick={(e) => window.print()}
        className="py-2 px-4 text-white bg-blue-500 absolute top-5 right-5"
      >
        Print
      </button>
      <h1 className="font-bold text-4xl cursive">Medical Certificate</h1>
      <h1 className="font-bold text-2xl font-serif">To Whom it May Concern</h1>
      {student !== null && (
        <div className="cursive">
          <span className="text-xl font-semibold min-w-fit ">
            This is to certify that Master/Mistress
          </span>{" "}
          <span className="underline text-xl font-bold min-w-fit ">
            {student.student.first_name} {student.student.last_name}
          </span>
          <span className="text-xl font-semibold min-w-fit ">
            {" "}
            whose date of birth is{" "}
          </span>
          <span className="underline text-xl font-bold min-w-fit ">
            {student.student.dob}
          </span>
          <span className="text-xl font-semibold min-w-fit ">
            {" "}
            {"s/o / d/o"}
          </span>
          <span className="underline text-xl font-bold min-w-fit ">
            {student.student.fathers_name}
          </span>
          <span className="text-xl font-semibold min-w-fit ">
            {" "}
            found medically fit/unfit for MCF Camp. There is no past history of
            illness of the cadet
          </span>
        </div>
      )}
      <div className="flex items-end justify-between w-full mt-auto">
        <div>
          Date:{" "}
          <span className="border-2 border-solid p-3 ">{formattedDate}</span>
        </div>
        <div className="flex flex-col ">
          <span className="self-center">Sign of Medical Officer</span>
          <span>Name: ______________________________</span>
          <span>Designation: ________________________</span>
          <span>Stamp: ______________________________</span>
        </div>
      </div>
    </div>
  );
};

export default View_medical_certificate;
