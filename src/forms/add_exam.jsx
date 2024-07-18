import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../utils/domain";

function AddExam() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    exam_name: "",
    exam_date: "",
    exam_duration: "",
    exam_description: "",
    exam_status: "Inactive",
  });

  // useEffect(() => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     final_fee:
  //       parseInt(formData.camp_fee) - parseInt(formData.fee_discount)
  //         ? `${parseInt(formData.camp_fee) - parseInt(formData.fee_discount)}`
  //         : "0",
  //   }));
  // }, [formData.camp_fee, formData.fee_discount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      exam_status: event.target.checked ? "Active" : "Inactive",
    });
  };

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert date to yyyy-mm-dd format
    // const formattedDiscountDate = convertDate(formData.discount_date);

    try {
      const form = new FormData();
      for (const key in formData) {
        form.append(
          key, formData[key]
        );
        console.log(form)
      }

      const response = await axios.post(`https://${baseurl}/addExam`, form);

      // const responseData = await response.json();
      setLoading(false);

      // if (response.ok) {
      console.log("Exam added successfully!");
      alert("Exam added successfully!");
      navigate("/exams");

      // } else {
      // console.error('Failed to add camp:', responseData.error);
      // alert('Failed to add camp. Check console for details.');
      // }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      alert("An error occurred. Check console for details.");
    }
  };

  // const convertDate = (dateString) => {
  //   const [day, month, year] = dateString.split("-");
  //   const formattedDate = `${year}-${month}-${day}`;
  //   return formattedDate;
  // };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-screen-xl mx-auto">
            <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header
                className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Add Exam
                </h2>
                <Link
                  end
                  to="/exams"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Back to Exam List
                </Link>
              </header>
              <div className="p-3 shadow-lg border border-gray-300 rounded-lg">
                <form className="space-y-2" onSubmit={handleSubmit}>
                  <label className="text-lg font-semibold">Exam Name</label>
                  <input
                    type="text"
                    name="exam_name"
                    value={formData.exam_name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  />

                  {/* <label className="text-lg font-semibold">Chess Prefix</label>
                  <input
                    type="text"
                    name="chess_prefix"
                    value={formData.chess_prefix}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  /> */}

                  <label className="text-lg font-semibold">Exam Duration</label>
                  <input
                    type="text"
                    name="exam_duration"
                    value={formData.exam_duration}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  />

                  <label className="text-lg font-semibold">
                    Exam Description
                  </label>
                  <input
                    type="text"
                    name="exam_description"
                    value={formData.exam_description}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  />

                  <label className="text-lg font-semibold">Exam Date</label>
                  <input
                    type="date"
                    name="exam_date"
                    value={formData.exam_date}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  />

                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      name="exam_status"
                      checked={formData.exam_status === "Active"}
                      onChange={handleCheckboxChange}
                      className="text-blue-500 focus:ring focus:ring-blue-400"
                    />
                    <label className="text-lg">Is Active</label>
                  </div>

                  <button
                    type="submit"
                    className="w-32 p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                  >
                    {loading ? "Adding..." : "Add"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddExam;
