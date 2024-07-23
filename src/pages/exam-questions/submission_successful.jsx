import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../utils/domain";
import successGif1 from "../../images/animation-2.gif"; // Import the GIF
import successGif2 from "../../images/animation-3.gif";
import "./exam-questions.css"; // Import the CSS file for styling

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
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#7ca0a9" }}
    >
      <div className="success-page">
        <div>
          <p>Dear,</p>
          <name1>
            <strong>{userData.first_name + " " + userData.last_name}</strong>
          </name1>
          <p>Thanks for Submitting,</p>
          <h2>{userData.exam_name}</h2>
        </div>
        <div>
          {userData.gender === "female" && (
            <img
              src={successGif1}
              alt="Success Animation"
              className="success-gif"
            />
          )}
          {userData.gender === "male" && (
            <img
              src={successGif2}
              alt="Success Animation"
              className="success-gif"
            />
          )}
        </div>
        <div>
          <p1>Your Exam is Submitted Successfully!</p1>
          <hr />
          <p>You will receive the Result and Certificate on Email.</p>
        </div>
      </div>
    </div>
  );
}

export default submission_success;
