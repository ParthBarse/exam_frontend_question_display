import React, { useState, useEffect, useRef, useCallback } from "react";
import Webcam from 'react-webcam';
// import { useHistory } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../utils/domain";
import { requestFullscreen } from './fullscreen'; // Import the fullscreen utility

function DisplayQuestion() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
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

  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [step, setStep] = useState('camera');

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setStep('preview');
  }, [webcamRef]);

  const handleSaveAndNext = async () => {
    try {
      const formData = new FormData();
      formData.append('file', imageSrc);
      formData.append('seid', seid)

      const res = await axios.post(`https://${baseurl}/uploadFile2`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { file_url } = res.data;
      localStorage.setItem('file_url', file_url);

      console.log('Image uploaded successfully:', file_url);
      setStep('instructions');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleEnterFullScreen = async () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      try {
        const formData = new FormData();
        formData.append('seid', seid)
        formData.append('captured_image', localStorage.getItem('file_url'))

        const res = await axios.post(`https://${baseurl}/startExam`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate(`/display_questions?id=${exam_id}&seid=${seid}`);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
      try {
        const formData = new FormData();
        formData.append('seid', seid)
        formData.append('captured_image', localStorage.getItem('file_url'))

        const res = await axios.post(`https://${baseurl}/startExam`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate(`/display_questions?id=${exam_id}&seid=${seid}`);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
      try {
        const formData = new FormData();
        formData.append('seid', seid)
        formData.append('captured_image', localStorage.getItem('file_url'))

        const res = await axios.post(`https://${baseurl}/startExam`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate(`/display_questions?id=${exam_id}&seid=${seid}`);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
      try {
        const formData = new FormData();
        formData.append('seid', seid)
        formData.append('captured_image', localStorage.getItem('file_url'))

        const res = await axios.post(`https://${baseurl}/startExam`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate(`/display_questions?id=${exam_id}&seid=${seid}`);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleStartTest = () => {
    console.log('Starting test...');
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
                {step === 'camera' && (
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Screening - Please Allow Camera Permission to Continue
                </h2>)}

                {step === 'instructions' && (
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Screening - Please Read All Instructions
                </h2>)}

                {step === 'preview' && (
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Screening - Preview
                </h2>)}

                {/* <div>
                  <h1>Remaining Time: {formatTime(remainingDuration)}</h1>
                </div> */}
              </header>

              <div className="p-3 shadow-lg border border-gray-300 rounded-lg">

                <div>
                  {step === 'camera' && (
                    <div>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                      />
                      <button onClick={capture}>Capture</button>
                    </div>
                  )}
                  {step === 'preview' && (
                    <div>
                      <h2>Preview</h2>
                      {imageSrc && <img src={imageSrc} alt="Captured" />}
                      <button onClick={() => setStep('camera')}>Retake</button>
                      <button onClick={handleSaveAndNext}>Save and Next</button>
                    </div>
                  )}
                  {step === 'instructions' && (
                    <div>
                      <h1>Instructions</h1>
                      <p>Follow these instructions to complete the test...</p>
                      <button onClick={handleEnterFullScreen}>Enter Full Screen and Start Test</button>
                      {/* <button onClick={handleStartTest}>Start Test</button> */}
                    </div>
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
