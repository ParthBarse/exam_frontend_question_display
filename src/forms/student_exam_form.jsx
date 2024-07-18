import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-flatpickr";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { baseurl } from "../utils/domain";

const FirstDetails = () => {
  const reqData = new FormData();
  const navigate = useNavigate();

  const punePickupLocations = [
    "Self Drop",
    "Nigadi Bhaktishakti",
    "Akurdi Khandoba Mandir",
    "Chinchawad Chaphekar Chowk",
    "Kalewadi Phata",
    "Sangvi Phata",
    "Aundh Shivaji Vidyalaya",
    "Khadki Bazar",
    "Yerwada Deccan College",
    "Kharadi Bypass",
    "Hadapsar – Gadital Akashwani",
    "Swarget – PMPL Bus Stop",
    "Katraj – PMPL Bus stop",
    "Spine Road",
    "Bhosari Dighi Road",
    "Nasik Phata",
    "Kokane Chowk",
    "Baner Sadanand Hotel",
    "Chandani Chowk – Auto Stop",
    "Warje- Mai Mangeshkar Hospital",
    "Sinhgad Navale Bridge",
  ];

  const selfPickupLocations = ["Self Drop"];

  const mumbaiPickupLocations = [
    "Self Drop",
    "Dadar (Asiad bus stop)",
    "Vashi (Vashi Plaza, Below Vashi Bridge, Shivneri, Bus stop)",
    "Thane(Near Shivaji Hospital Kalwa Naka)",
    "Airoli",
    "Rabale",
    "Ghansoli",
    "Koparkhairane",
    "Turbhe",
    "Juinagar",
    "Nerur",
    "Belapur",
    "Kamati",
    "Kharghar",
    "Panvel (McDonald’s Panvel Bus Stand)",
  ];

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get(`https://${baseurl}/getAllExams`);
        setExams(response.data.exams);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchCamps();
  }, []);
  const getExamName = (examId) => {
    const exam = exams.find((exam) => exam.exam_id === examId);
    return exam ? exam.exam_name : "Exam not found";
  };


  const [errorState, setErrorState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "none",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleErrorClose = () => {
    setErrorState({ ...errorState, open: false });
  };

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phn: "",
    wp_no: "",
  });


  const [admissionFormData, setAdmissionFormData] = useState({
    gender: "",
  });

  const [examId, setExamId] = useState("");

  useEffect(() => {
    if (admissionFormData.exam_name) {
      const selectedExam = exams.find(
        (exam) => exam.exam_name === admissionFormData.exam_name
      );
      if (selectedExam) {
        setExamId(selectedExam.exam_id);
        admissionFormData["exam_id"] = selectedExam.exam_id;

      }
    }
  }, [admissionFormData.exam_name, exams]);




  const handleAdmissionChange = (name, value) => {
    setAdmissionFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {

      const len = Object.keys(formData).length;

      for (let key in formData) {
        reqData.append(key, formData[key]);
      }

      for (let key in admissionFormData) {
        reqData.append(key, admissionFormData[key]);
      }
      // reqData.append('exam_id',examId)


      const response = await axios.post(
        `https://${baseurl}/registerStudentExam`,
        reqData
      );

      console.log(response.data); // Log the response from the server
      setLoading(false);
      setState({ vertical: "bottom", horizontal: "right", open: true });
      navigate("/reg-students-exam");
    } catch (error) {
      setLoading(false);
      setErrorState({
        vertical: "bottom",
        horizontal: "right",
        open: true,
        message: error.response.data.error,
      });
      console.error("Error adding student:", error.response.data.error);
    }
  };
  // Function to calculate age
  function calculate_age(dob) {
    var diff_ms = Date.now() - new Date(dob).getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  // Function to assign company
  function assign_company(age, gender) {
    if (age >= 7 && age <= 11 && gender === "male") {
      return "ALPHA";
    } else if (age >= 12 && age <= 16 && gender === "male") {
      return "BRAVO";
    } else if (age >= 17 && age <= 21 && gender === "male") {
      return "DELTA";
    } else if (age >= 7 && age <= 11 && gender === "female") {
      return "CHARLEY";
    } else if (age >= 12 && age <= 16 && gender === "female") {
      return "ECO";
    } else if (age >= 17 && age <= 21 && gender === "female") {
      return "FOXFORD";
    }
  }

  // Inside handleChange function or wherever the form data is being handled
  let age = calculate_age(formData.dob);
  let company = assign_company(age, admissionFormData.gender);

  const convertDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const [couponStatus, setCouponStatus] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountCodes, setDiscountCodes] = useState([]);

  useEffect(() => {
    axios
      .get(`https://${baseurl}/getAllDiscounts`)
      .then((res) => setDiscountCodes(res.data.discounts));
  }, []);

  return (
    <div>
      {/* Payment Form */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <div>
              <header
                className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 className="font-semibold text-base text-slate-800 dark:text-slate-100">
                  Enter Your Details
                </h2>
              </header>
              <div className="overflow-x-auto">
                <form className="  rounded px-8 pt-6 pb-8 mb-4">
                  <div className="grid-cols-1 grid md:grid-cols-3 gap-4">
                    {/* Name fields */}
                    <div className="mb-4">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-600"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="first_name"
                        value={formData.first_name.toUpperCase()}
                        type="text"
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="middlename"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Middle Name
                      </label>
                      <input
                        id="middlename"
                        name="middle_name"
                        value={formData.middle_name.toUpperCase()}
                        type="text"
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        placeholder="Middle Name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="last_name"
                        value={formData.last_name.toUpperCase()}
                        type="text"
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        id="emial"
                        name="email"
                        value={formData.email}
                        type="text"
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                      />
                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="">
                      <div className="mb-4">
                        <label
                          htmlFor="camp_category"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={admissionFormData.gender}
                          onChange={(e) =>
                            handleAdmissionChange("gender", e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                        >
                          {/* Options for Camp Category */}
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div className="">
                      <div className="mb-4">
                        <label
                          htmlFor="Phone"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Phone
                        </label>
                        <input
                          id="Phone"
                          name="phn"
                          value={formData.phn}
                          type="text"
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                          placeholder="Phone"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="">
                      <div className="mb-4">
                        <label
                          htmlFor="wp_no"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Whatsapp Number
                        </label>
                        <input
                          id="wp_no"
                          name="wp_no"
                          value={formData.wp_no}
                          type="text"
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                          placeholder="Whatsapp Number"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="my-4 h-1 bg-gray-200" />

                  <div className="mb-4">
                    <label
                      htmlFor="camp_category"
                      className="block text-lg font-medium text-gray-600"
                    >
                      Exam Name
                    </label>
                    <select
                      id="exam_name"
                      name="exam_name"
                      value={admissionFormData.exam_name}
                      onChange={(e) =>
                        handleAdmissionChange("exam_name", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                    >
                      {/* Options for exam Category */}
                      <option value="">Select Exam Name</option>
                      {exams.map((exam) => (
                        <option value={exam.exam_name}>{exam.exam_name}</option>
                      ))}
                    </select>
                  </div>
                  <hr className="my-4 h-1 bg-gray-200" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around mb-4">
        <button
          onClick={handleSubmit}
          className="btn-primary w-1/4"
          style={{
            padding: "5px 10px",
            background: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : "Add Student"}
        </button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={3000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Student Added Successfully
        </Alert>
      </Snackbar>
      {/* ///////////////////////////////// */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={errorState.open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={3000}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FirstDetails;
