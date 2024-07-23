import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../utils/domain";
function EditBatch() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const question_id = queryParams.get("id");
  const convertDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [questionData, setQuestionData] = useState({});
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
          `https://${baseurl}/getQuestion?question_id=${question_id}`
        );
        if (response.ok) {
          const questionDetails = await response.json();

          // Ensure that the response structure matches your expectations
          setQuestionData(questionDetails.question);
          console.log(questionData)
        } else {
          console.error("Failed to fetch question details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [question_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuestionData({
      ...questionData,
      [name]: type === "checkbox" ? checked : value,
    });
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
                  View Question
                </h2>
              </header>
              <div className="p-3 shadow-lg border border-gray-300 rounded-lg">
                <div className="mb-4 flex flex-col">
                  {questionData.questionText && (
                    <div className="flex flex-col p-4 w-1/2">
                      <h1>Question :</h1>
                      {questionData.questionText}
                    </div>)}

                  {questionData.questionImage && (
                    <div className="flex flex-col p-4 w-full">
                      <h1>Question :</h1>
                      <img src={questionData.questionImage} style={{ maxWidth: "80%", width:"auto", height: "auto", maxHeight: "300px" }} alt="" />
                    </div>)}
                </div>

                <div className="flex flex-col p-4 w-1/2">
                  {Object.keys(questionData)
                    .filter(key => key.startsWith('option') && questionData[key]) // Filter keys starting with 'option' and having truthy values
                    .map((key, index) => {
                      const optionValue = questionData[key];
                      const isCorrect = questionData.correctOptions && questionData.correctOptions.includes(optionValue);

                      return (
                        <div key={key} className={`flex flex-row mb-4 ${isCorrect ? 'text-green-600 font-bold' : ''}`}>
                          {`Option ${index + 1}: ${optionValue}`} {isCorrect && "(Correct)"}
                        </div>
                      );
                    })}
                </div>

                <div className="flex flex-row">
                  <div className="flex flex-col p-4">
                    <label
                      htmlFor="batch_intake"
                      className="block text-gray-700"
                      style={{backgroundColor:"lime", padding:"8px"}}
                    >
                      Marks : {questionData.marks}
                    </label>
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

export default EditBatch;
