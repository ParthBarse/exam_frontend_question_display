import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { Link, useLocation } from "react-router-dom";
import { baseurl } from "../../utils/domain";

function FeeDiscount() {
  const location = useLocation();
  const [campFeeDetail, setCampFeeDetail] = useState();
  const [campName, setCampName] = useState("");

  useEffect(() => {
    // Fetch data from the API endpoint
    const queryParams = new URLSearchParams(location.search);
    setCampName(queryParams.get("campname"));

    axios
      .get(`https://${baseurl}/getFeeDetails/${campName}`)
      .then((response) => {
        // Update the state with the fetched data
        setCampFeeDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching fee details:", error);
      });
  }, [campName, location.search]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
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
                    Camp fee Discounts
                  </h2>
                  <Link
                    end
                    to="/camp"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                  >
                    Back to Camp List
                  </Link>
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
                            <div className="font-semibold text-center">Sr.</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-left">
                              Discount Date
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Discount Amount
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Status
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
                        {/* Row */}
                        <tr style={{ padding: "2px" }}>
                          <td>
                            <div
                              className="text-center"
                              style={{ fontWeight: "bold" }}
                            >
                              1
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-left">
                              <div className="text-slate-800 dark:text-slate-100">
                                {campFeeDetail?.Name}
                              </div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {campFeeDetail?.Fees}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center text-emerald-500">
                              {campFeeDetail?.Status}Active
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              <button
                                className="text-sm text-white px-2 bg-indigo-500 rounded"
                                style={{
                                  marginRight: "10px",
                                  padding: "3px 10px 3px 10px",
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="text-sm text-white px-2 bg-red-500 rounded"
                                style={{
                                  marginRight: "10px",
                                  padding: "3px 10px 3px 10px",
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
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

export default FeeDiscount;
