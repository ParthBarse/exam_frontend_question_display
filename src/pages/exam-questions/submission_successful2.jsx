import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../utils/domain";
import successGif from '../../images/suucess-animation-1.gif'; // Import the GIF
import './exam-questions.css'; // Import the CSS file for styling

function submission_success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const question_id = queryParams.get("id");
  const exam_id = queryParams.get("exam_id");
  const seid = queryParams.get("seid");

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    // Fetch initial data for the form based on the exam ID
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://${baseurl}/getExamStudent?seid=${seid}`
        );
        if (response.ok) {
          const studentData = await response.json();

          // Ensure that the response structure matches your expectations
          setUserData(studentData.student);
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [seid]);


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="success-page">
        <h1>Dear, <strong>{userData.first_name+" "+ userData.last_name}</strong></h1>
        <p>Thanks for Submitting, {userData.exam_name}</p>
        <img src={successGif} alt="Success Animation" className="success-gif" />
        <p className="m-4">Your Exam is Submitted Successfully!</p>
        <hr />
        <p className="m-4">You  will recieve Result and Certificate on Email.</p>
      </div>
    </div>
  );
}

export default submission_success;
