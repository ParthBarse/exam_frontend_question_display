import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../utils/domain";
function EditBatch() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const batchId = queryParams.get("id");
  const convertDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [batchData, setBatchData] = useState({
    batch_name: "",
    start_date: "",
    end_date: "",
    batch_intake: "",
    duration: "",
    batch_id: batchId,
    camp_id: "",
    students_registered: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // Fetch initial data for the form based on the batch ID
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${baseurl}/getBatch?batch_id=${batchId}`
        );
        if (response.ok) {
          const batchDetails = await response.json();

          // Ensure that the response structure matches your expectations
          setBatchData({
            batch_name: batchDetails.batch.batch_name,
            start_date: convertDate(batchDetails.batch.start_date),
            end_date: convertDate(batchDetails.batch.end_date),
            batch_intake: batchDetails.batch.batch_intake,
            duration: batchDetails.batch.duration,
            batch_id: batchDetails.batch.batch_id,
            camp_id: batchDetails.batch.camp_id,
            students_registered: batchDetails.batch.students_registered,
          });
        } else {
          console.error("Failed to fetch batch details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [batchId]);

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

    // Create a new FormData object
    const formData = new FormData();

    // Iterate over the batchData object and append each key-value pair to the FormData object
    for (let key in batchData) {
      if (key === "start_date" || key === "end_date") {
        const [year, month, day] = batchData[key].split("-");
        const formattedDate = `${day}-${month}-${year}`;
        formData.append(key, formattedDate);
        continue;
      }
      formData.append(key, batchData[key]);
    }

    try {
      const response = await axios.post(
        `https://${baseurl}/updateBatch`,
        formData
      );
      if (response.status === 200) {
        console.log("Batch Updated successfully!");
        alert("Batch Updated successfully!");

        // Get the camp_id from the response
        const camp_id = response.data.camp_id;

        // Clear the form
        setBatchData({
          batch_name: "",
          start_date: "",
          end_date: "",
          batch_intake: "",
          duration: "",
          batch_id: batchId,
          camp_id: "",
          students_registered: "",
        });

        // Redirect to the specific URL with the camp_id
        window.location.href = `https://admin.mcfcamp.in/batch-details?id=${camp_id}`;
      } else {
        console.error("Failed to add batch. Status:", response.status);
      }
    } catch (error) {
      console.error("Error adding batch:", error.message);
      console.error(error.response.data);
    }
  };

  const formattedStartDate = convertDate(batchData.start_date);
  const formattedEndDate = convertDate(batchData.end_date);

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
                  Update Batch
                </h2>
              </header>
              <div className="p-3 shadow-lg border border-gray-300 rounded-lg">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="batch_name" className="block text-gray-700">
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
                        htmlFor="start_date"
                        className="block text-gray-700"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        required
                        placeholder="yyyy-mm-dd"
                        id="start_date"
                        name="start_date"
                        value={batchData.start_date}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                      />
                    </div>
                    <div className="flex flex-col p-4 w-1/2">
                      <label htmlFor="end_date" className="block text-gray-700">
                        End Date
                      </label>
                      <input
                        placeholder="yyyy-mm-dd"
                        type="date"
                        id="endDate"
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
                        htmlFor="batch_intake"
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
                        disabled
                      />
                    </div>
                    <div className="flex flex-col p-4 w-1/2">
                      <label htmlFor="duration" className="block text-gray-700">
                        duration
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

                  <div className="flex flex-row">
                    {/* <div className="flex flex-col p-4 w-1/2">
                  <label
                      htmlFor="batch_intake"
                      className="block text-gray-700"
                    >
                      Date 
                    </label>
                    <input
                      type="text"
                      id="camp_dates"
                      name="Camp_dates"
                      value={batchData.students_registered}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div> */}
                    <div className="flex flex-col p-4 w-1/2">
                      <label
                        htmlFor="batch_intake"
                        className="block text-gray-700"
                      >
                        Total Students Registered
                      </label>
                      <input
                        type="text"
                        id="students_registered"
                        name="students_registered"
                        value={batchData.students_registered}
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

export default EditBatch;
