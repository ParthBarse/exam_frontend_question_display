import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { baseurl } from "../../utils/domain";

function Batchdetails() {
  const [data, setData] = useState({
    batches: [
      {
        batch_id: "",
        batch_intake: 0,
        batch_name: "",
        camp_id: "",
        company: "",
        duration: "",
        end_date: "",
        start_date: "",
        students_registered: 0,
      },
    ],
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const campId = queryParams.get("id");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://${baseurl}/getBatches?camp_id=${campId}`
      );
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search, campId]);

  const handleDelete = async (batch_id) => {
    try {
      if(confirm("Do you Really want to Delete This Batch ?")){
      const response = await axios.delete(
        `https://${baseurl}/deleteBatch?batch_id=${batch_id}`
      );

      if (response.status === 200) {
        console.log("Batch deleted successfully!");
        alert("Batch deleted successfully!");

        // Update the state to remove the deleted item
        setData((prevData) =>
          prevData.filter(
            (item) => item.batch_id.toString() !== batch_id.toString()
          )
        );

        // Refresh the page
        window.location.reload();
      } else {
        console.error("Failed to delete batch. Status:", response.status);
      }}
    } catch (error) {
      console.error("Error deleting batch:", error.message);
      console.error(error.response?.data); // Log the response data if available
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header
                  className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                    Camp Batch details
                  </h2>
                  <div>
                    <Link
                      to={`/add-batch?id=${campId}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mr-2"
                    >
                      Add Batch
                    </Link>
                    <Link
                      to="/camp"
                      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                    >
                      Back to Camp List
                    </Link>
                  </div>
                </header>
                <div className="p-4">
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table
                      className="dark:text-slate-300"
                      style={{ width: "100%" }}
                    >
                      {/* Table header */}
                      <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                        <tr>
                          <th className="p-4">
                            <div className="font-semibold text-left">Sr.</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-left">Batch</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Batch Start
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Batch End
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Company
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Duration
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Intake
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Registered students
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Action
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        {/* Rows */}
                        {Array.isArray(data.batches) &&
                          data.batches.map((item, index) => (
                            <tr style={{ padding: "2px" }} key={index}>
                              <td>
                                <div
                                  className="text-left"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {index + 1}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-left">
                                  <div className="text-slate-800 dark:text-slate-100">
                                    {item.batch_name}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {item.start_date}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {item.end_date}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {item.company}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {item.duration}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {item.batch_intake}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {item.students_registered}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  <Link
                                    to={`/edit-batch?id=${item.batch_id}`}
                                    className="text-sm text-white px-2 bg-yellow-500 rounded"
                                    style={{
                                      padding: "5px",
                                      fontSize: "13px",
                                      marginLeft: "1px",
                                      marginRight: "2px",
                                    }}
                                  >
                                    View & Edit
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(item.batch_id)}
                                    className="text-sm text-white px-2 bg-red-500 rounded"
                                    style={{
                                      marginLeft: "10px",
                                      padding: "3px 10px 3px 10px",
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Batchdetails;
