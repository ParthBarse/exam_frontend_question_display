import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../utils/domain";
import { requestFullscreen } from './fullscreen'; // Import the fullscreen utility

function DisplayQuestion() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const question_id = queryParams.get("id");
  const exam_id = queryParams.get("id");
  const seid = queryParams.get("seid");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [questionData, setQuestionData] = useState({});
  const navigate = useNavigate();

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [statusData, setStatusData] = useState("");

  const [selectedAnswersMap, setSelectedAnswersMap] = useState(() => {
    // Retrieve stored selected answers from localStorage
    const storedAnswers = localStorage.getItem('selectedAnswersMap');
    return storedAnswers ? JSON.parse(storedAnswers) : {};
  });

  useEffect(() => {
    // Fetch initial data for the form based on the exam ID
    const checkStudentExamStatus = async () => {
      try {
        const response = await fetch(
          `https://${baseurl}/checkStudentExamStatus?seid=${seid}`
        );
        if (response.ok) {
          const statusData = await response.json();

          // Ensure that the response structure matches your expectations
          if (statusData.status === "submitted") {
            navigate(`/submissionSuccessful?exam_id=${exam_id}&seid=${seid}`);
          }
          setStatusData(statusData.status);
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkStudentExamStatus();
  }, [seid]);

  useEffect(() => {
    if (!exam_id || !seid) {
      navigate("/");
    }
    else if (statusData === "submitted") {
      navigate(`/submissionSuccessful?exam_id=${exam_id}&seid=${seid}`);
    }
  }, []);

  const handleFullscreen = () => {
    const element = document.documentElement; // Use the whole document
    requestFullscreen(element);
  };


  useEffect(() => {
    // Fetch initial data for the form based on the exam ID
    const fetchAllQuestions = async () => {
      try {
        const response = await fetch(
          `https://${baseurl}/getQuestions?exam_id=${exam_id}`
        );
        if (response.ok) {
          const allQuestions = await response.json();

          // Ensure that the response structure matches your expectations
          setAllQuestions(allQuestions.question);
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllQuestions();
  }, [exam_id]);

  const submitAnswers = async () => {
    const questionId = allQuestions[currentQuestionIndex].question_id;
    const seid = new URLSearchParams(window.location.search).get('seid');

    try {
      const response = await fetch(`https://${baseurl}/submitAnswers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question_id: questionId,
          answers: selectedAnswersMap[questionId] || [],
          seid: seid,
        }),
      });

      const response2 = await fetch(`https://${baseurl}/submitExam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exam_id: exam_id,
          seid: seid,
        }),
      });

      if (response.ok && response2.ok) {
        localStorage.removeItem('selectedAnswersMap')
        console.log("Answers submitted successfully");
        return true;
      } else {
        console.error("Failed to submit answers");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };


  const handleCheckboxChange = (optionValue) => {
    const questionId = allQuestions[currentQuestionIndex].question_id;
    setSelectedAnswersMap((prevSelectedAnswersMap) => {
      const currentSelectedAnswers = prevSelectedAnswersMap[questionId] || [];
      const newSelectedAnswers = currentSelectedAnswers.includes(optionValue)
        ? currentSelectedAnswers.filter((answer) => answer !== optionValue)
        : [...currentSelectedAnswers, optionValue];

      const updatedAnswersMap = {
        ...prevSelectedAnswersMap,
        [questionId]: newSelectedAnswers,
      };

      // Store updated selected answers in localStorage
      localStorage.setItem('selectedAnswersMap', JSON.stringify(updatedAnswersMap));

      return updatedAnswersMap;
    });
  };

  const handleSaveAndNext = async () => {
    const questionId = allQuestions[currentQuestionIndex].question_id;
    const seid = new URLSearchParams(window.location.search).get('seid');

    try {
      const response = await fetch(`https://${baseurl}/submitAnswers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question_id: questionId,
          answers: selectedAnswersMap[questionId] || [],
          seid: seid,
        }),
      });

      if (response.ok) {
        console.log("Answers submitted successfully");
        if (currentQuestionIndex < allQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          console.log("End of questions");
        }
      } else {
        console.error("Failed to submit answers");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitExam = async () => {
    const success = await submitAnswers();
    if (success) {
      if (confirm("Are you sure you want to submit the exam?")) {
        const seid = new URLSearchParams(window.location.search).get('seid');
        navigate(`/submissionSuccessful?exam_id=${exam_id}&seid=${seid}`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = allQuestions[currentQuestionIndex];
  const currentSelectedAnswers = selectedAnswersMap[currentQuestion?.question_id] || [];


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
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

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


                {/* <div className="mb-4 flex flex-col">
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
                </div> */}

                <div className="mb-4 flex flex-col">
                  {allQuestions.length > 0 && (
                    <>
                      <div className="flex flex-col p-4 w-1/2">
                        {currentQuestion.questionText && (
                          <div>
                            <h2>Question :</h2>
                            {currentQuestion.questionText}
                          </div>
                        )}

                        {currentQuestion.questionImage && (
                          <div className="flex flex-col p-4 w-full">
                            <h2>Question :</h2>
                            <img
                              src={currentQuestion.questionImage}
                              style={{ maxWidth: "80%", width: "auto", height: "auto", maxHeight: "300px" }}
                              alt=""
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-row">
                        <div className="flex flex-col p-4">
                          <label
                            htmlFor="batch_intake"
                            className="block text-gray-700"
                            style={{ backgroundColor: "lime", padding: "8px" }}
                          >
                            Marks : {currentQuestion.marks}
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-col p-4 w-1/2">
                        {Object.keys(currentQuestion)
                          .filter(key => key.startsWith('option') && currentQuestion[key])
                          .map((key, index) => {
                            const optionValue = currentQuestion[key];
                            return (
                              <div key={key} className="flex items-center mb-4">
                                <input
                                  type="checkbox"
                                  id={`option-${index}`}
                                  value={optionValue}
                                  checked={currentSelectedAnswers.includes(optionValue)}
                                  onChange={() => handleCheckboxChange(optionValue)}
                                  className="mr-2"
                                />
                                <label htmlFor={`option-${index}`}>{`Option ${index + 1}: ${optionValue}`}</label>
                              </div>
                            );
                          })}
                      </div>

                      <div className="mt-4 flex justify-between m-4">
                        <button
                          className="p-2 bg-gray-500 text-white rounded"
                          onClick={handlePrevious}
                          disabled={currentQuestionIndex === 0}
                        >
                          Previous
                        </button>
                        <div className="flex justify-center">
                          {currentQuestionIndex < allQuestions.length - 1 ? (
                            <button
                              className="p-2 bg-blue-500 text-white rounded"
                              onClick={handleSaveAndNext}
                            >
                              Save and Next
                            </button>
                          ) : (
                            <button
                              className="p-2 bg-green-500 text-white rounded"
                              onClick={handleSubmitExam}
                            >
                              Submit Exam
                            </button>
                          )}
                        </div>
                      </div>



                      {/* <button onClick={handleFullscreen} className="fullscreen-button">
                        Enter Fullscreen
                      </button> */}

                    </>
                  )}
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DisplayQuestion;
