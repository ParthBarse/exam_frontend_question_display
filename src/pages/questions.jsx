import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { baseurl } from "../utils/domain";

function Questiondetails() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get("id");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://${baseurl}/getQuestions?exam_id=${examId}`
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        setData(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search, examId]);

  const handleDelete = async (question_id) => {
    try {
      if(confirm("Do you Really want to Delete This Question ?")){
      const response = await axios.delete(
        `https://${baseurl}/deleteQuestion?question_id=${question_id}`
      );

      if (response.status === 200) {
        console.log("Question deleted successfully!");
        alert("Question deleted successfully!");

        // Update the state to remove the deleted item
        setData((prevData) =>
          prevData.filter(
            (item) => item.question_id.toString() !== question_id.toString()
          )
        );

        // Refresh the page
        window.location.reload();
      } else {
        console.error("Failed to delete Question. Status:", response.status);
      }}
    } catch (error) {
      console.error("Error deleting Question:", error.message);
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
                    Questions
                  </h2>
                  <div>
                    <Link
                      to={`/add-question?id=${examId}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mr-2"
                    >
                      Add Questions
                    </Link>
                    <Link
                      to="/exams"
                      className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                    >
                      Back to Exam List
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
                            <div className="font-semibold text-left">Question Type</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Question
                            </div>
                          </th>
                          {/* <th className="p-2">
                            <div className="font-semibold text-center">
                              Answers
                            </div>
                          </th> */}
                          <th className="p-2 mr-28">
                            <div className="font-semibold text-center">
                              Marks
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
                        {Array.isArray(data.question) &&
                          data.question.map((item, index) => (
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
                                  {item.questionType.charAt(0).toUpperCase() + item.questionType.slice(1)}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2">
                              {item.questionText && (
                                <div className="text-center">
                                  {item.questionText}
                                </div>)}

                                {item.questionImage && (
                                <div className="text-center">
                                  <img src={item.questionImage} style={{ maxWidth: "100%", height: "auto", maxHeight: "240px" }} alt="" />
                                </div>)}
                              </td>
                              {/* <td className="p-2">
                                <div className="text-center">
                                {item.correctOptions}
                                </div>
                              </td> */}
                              <td className="p-2">
                                <div className="text-center">
                                  {item.marks}
                                </div>
                              </td>

                              <td className="p-2">
                                <div className="text-center flex flex-row">
                                  <Link
                                    to={`/view-question?id=${item.question_id}`}
                                    className="text-sm text-white px-2 bg-yellow-500 rounded"
                                    style={{
                                      padding: "5px",
                                      fontSize: "13px",
                                      marginLeft: "1px",
                                      marginRight: "2px",
                                    }}
                                  >
                                    View
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(item.question_id)}
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

export default Questiondetails;
