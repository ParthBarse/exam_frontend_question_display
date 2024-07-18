import React, { useState } from "react";
import axios from "axios"; // Import Axios
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useLocation } from "react-router-dom";
import { baseurl } from "../utils/domain";
function AddBatch() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const campId = queryParams.get("id");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [batchData, setBatchData] = useState({
    batch_name: "",
    start_date: "", // Corrected name
    end_date: "", // Corrected name
    batch_intake: "",
    company: "", // Added Company field
    duration: "", // Added Duration field
    camp_id: campId,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBatchData({
      ...batchData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert dates to yyyy-mm-dd format
    const formattedStartDate = convertDate(batchData.start_date);
    const formattedEndDate = convertDate(batchData.end_date);

    // Create a new FormData object
    const formData = new FormData();

    // Iterate over the batchData object and append each key-value pair to the FormData object
    for (let key in batchData) {
      formData.append(
        key,
        key.includes("date") ? convertDate(batchData[key]) : batchData[key]
      );
    }

    try {
      const response = await axios.post(
        `https://${baseurl}/addBatch`,
        formData
      );
      if (response.status === 200) {
        console.log("Batch added successfully!");
        alert("Batch added successfully!");
        // Clear the form
        setBatchData({
          batch_name: "",
          start_date: "",
          end_date: "",
          batch_intake: "",
          duration: "",
          camp_id: campId,
        });
        window.location.href = `https://admin.mcfcamp.in/batch-details?id=${campId}`;
      } else {
        console.error("Failed to add batch. Status:", response.status);
      }
    } catch (error) {
      console.error("Error adding batch:", error.message);
      console.error(error.response.data);
    }
  };

  const convertDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

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
                  Add Batch
                </h2>
                <Link
                  end
                  to={`/batch-details?id=${campId}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Back to Batch list
                </Link>
              </header>
              <div className="p-3 shadow-lg border border-gray-300 rounded-lg">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="batchName" className="block text-gray-700">
                      Batch Name
                    </label>
                    <input
                      type="text"
                      id="batch_name"
                      name="batch_name"
                      value={batchData.batch_name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex flex-row mb-4">
                    <div className="flex flex-col p-4 w-1/2">
                      <label
                        htmlFor="startDate"
                        className="block text-gray-700"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={batchData.start_date}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                    <div className="flex flex-col p-4 w-1/2">
                      <label htmlFor="endDate" className="block text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={batchData.end_date}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row mb-4">
                    <div className="flex flex-col p-4 w-1/2">
                      <label
                        htmlFor="batchIntake"
                        className="block text-gray-700"
                      >
                        Batch Intake
                      </label>
                      <input
                        type="text"
                        id="batch_intake"
                        name="batch_intake"
                        value={batchData.batch_intake}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col p-4 w-1/2">
                      <label htmlFor="Duration" className="block text-gray-700">
                        Duration
                      </label>
                      <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={batchData.duration}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Submit
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

export default AddBatch;
