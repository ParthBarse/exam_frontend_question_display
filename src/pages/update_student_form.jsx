import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import axios from "axios";
import DatePicker from "react-flatpickr";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { baseurl } from "../utils/domain";
import { date } from "yup";

export default function AddStudent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="w-full max-w-l mx-auto p-4">
            <FirstDetails />
          </div>
        </main>
      </div>
    </div>
  );
}

const FirstDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const punePickupLocations = [
    "Self Drop",
    "NIGADI BHAKTISHAKTI",
    "AKURDI KHANDOBA MANDIR",
    "CHINCHAWAD CHAPHEKAR CHOWK",
    "KALEWADI PHATA",
    "SANGVI PHATA",
    "AUNDH SHIVAJI VIDYALAYA",
    "KHADKI BAZAR",
    "YERWADA DECCAN COLLEGE",
    "KHARADI BYPASS",
    "HADAPSAR – GADITAL AKASHWANI",
    "SWARGET – PMPL BUS STOP",
    "KATRAJ – PMPL BUS STOP",
    "SPINE ROAD",
    "BHOSARI DIGHI ROAD",
    "NASIK PHATA",
    "KOKANE CHOWK",
    "BANER SADANAND HOTEL",
    "CHANDANI CHOWK – AUTO STOP",
    "WARJE- MAI MANGESHKAR HOSPITAL",
    "SINHGAD NAVALE BRIDGE",
  ];

  const selfPickupLocations = ["Self Drop"];

  const mumbaiPickupLocations = [
    "Self Drop",
    "DADAR (ASIAD BUS STOP)",
    "VASHI (VASHI PLAZA, BELOW VASHI BRIDGE, SHIVNERI, BUS STOP)",
    "THANE(NEAR SHIVAJI HOSPITAL KALWA NAKA)",
    "AIROLI",
    "RABALE",
    "GHANSOLI",
    "KOPARKHAIRANE",
    "TURBHE",
    "JUINAGAR",
    "NERUR",
    "BELAPUR",
    "KAMATI",
    "KHARGHAR",
    "PANVEL (MCDONALD’S PANVEL BUS STAND)",
  ];

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [errorState, setErrorState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleErrorClose = () => {
    setErrorState({ ...errorState, open: false });
  };

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sid = queryParams.get("id");
    axios
      .get(`https://${baseurl}/getStudent?sid=${sid}`)
      .then((x) => setFormData(x.data.student));
  }, [location.search]);

  useEffect(() => {
    if (typeof formData["dob"] === "string") {
      let parts = formData["dob"].split("-"); // split the date string on '-'
      let date = new Date(parts[2], parts[1] - 1, parts[0]); // create a new Date object
      console.log(date);
      setFormData((prevData) => ({ ...prevData, dob: date }));
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getCampPrice = (campId) => {
    const camp = camps.find((camp) => camp.camp_id === campId);
    return camp ? camp.camp_fee : "no found";
  };

  const [loading, setLoading] = useState(false);
  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const reqData = new FormData();

      for (let key in formData) {
        if (key === "dob") {
          let date = new Date(formData[key]);
          let day = ("0" + date.getDate()).slice(-2); // get the day as a string in the format DD
          let month = ("0" + (date.getMonth() + 1)).slice(-2); // get the month as a string in the format MM
          let year = date.getFullYear(); // get the year as a string in the format YYYY

          let formattedDate = `${day}-${month}-${year}`; // combine them all together in the format DD-MM-YYYY
          reqData.append(key, formattedDate);
        } else if (key == "camp_id" || key == "batch_id") {
          continue;
        } else if (key != "company") {
          reqData.append(key, formData[key]);
        }
      }

      // formData.camp_id = getCampId(selectedCamp);
      // formData.batch_id = getBatchId(selectedBatch)
      reqData.append("camp_id", getCampId(selectedCamp));
      reqData.append("batch_id", getBatchId(selectedBatch));

      let age = calculate_age(formData.dob);
      let company = assign_company(age, formData.gender);

      reqData.append("company", company);
      // console.log(age)
      // console.log(formData.gender)
      // console.log(company)
      // Make a POST request using axios

      const response = await axios.put(
        `https://${baseurl}/updateStudent`,
        reqData
      );
      // if (response.data.status === 'success') {
      // alert('Student Updated Successfully');
      console.log(response.data); // Log the response from the server

      setState({ vertical: "bottom", horizontal: "right", open: true });
      navigate("/RegStudent");
      // }

      // // After successfully adding a student, you might want to reset the form
    } catch (error) {
      setLoading(false);
      setErrorState({ vertical: "bottom", horizontal: "right", open: true });
      console.error("Error adding student:", error);
    }
  };
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get(`https://${baseurl}/getAllCamps`);
        setCamps(response.data.camps);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchCamps();
  }, []);

  const [batches, setBatches] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batch, setBatch] = useState({});
  useEffect(() => {
    const cid = getCampId(selectedCamp);
    const cp = getCampPrice(cid);
    setFormData({ ...formData, total_amount_payable: cp });
  }, [selectedCamp]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(
          `https://${baseurl}/getBatches?camp_id=${getCampId(selectedCamp)}`
        );
        setBatches(response.data.batches);
      } catch (error) {
        console.log("Error fetching batches :", error);
      }
    };
    fetchBatches();
  }, [selectedCamp]);

  // //////////////////////////////////////////////

  ////////////////////////////////////////////

  useEffect(() => {
    if (formData.camp_id) {
      const currentCamp = getCampName(formData.camp_id);
      setSelectedCamp(currentCamp);
    }
  }, [formData.camp_id]);

  useEffect(() => {
    if (formData.batch_id) {
      const currentBatch = getBatchName(formData.batch_id);
      setSelectedBatch(currentBatch);
    }
  }, [formData.batch_id, batches]);

  useEffect(() => {
    const fetchBatch = async () => {
      const response = await axios.get(
        `https://${baseurl}/getBatch?batch_id=${getBatchId(selectedBatch)}`
      );
      setBatch(response.data.batch);
    };
    fetchBatch();
  }, [selectedBatch]);

  // Function to calculate age
  function calculate_age(dob) {
    var diff_ms = Date.now() - new Date(dob).getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  // Function to assign company
  function assign_company(age, gender) {
    if (age >= 7 && age <= 11 && gender === "MALE") {
      return "ALPHA";
    } else if (age >= 12 && age <= 16 && gender === "MALE") {
      return "BRAVO";
    } else if (age >= 17 && age <= 21 && gender === "MALE") {
      return "DELTA";
    } else if (age >= 7 && age <= 11 && gender === "FEMALE") {
      return "CHARLEY";
    } else if (age >= 12 && age <= 16 && gender === "FEMALE") {
      return "ECO";
    } else if (age >= 17 && age <= 21 && gender === "FEMALE") {
      return "FOXFORD";
    }
  }

  // Inside handleChange function or wherever the form data is being handled

  const convertDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const getCampId = (campName) => {
    const camp = camps.find((camp) => camp.camp_name === campName);
    return camp ? camp.camp_id : "Camp not found";
  };

  const getBatchId = (batchName) => {
    const batch = batches.find((batch) => batch.batch_name === batchName);
    return batch ? batch.batch_id : "not found";
  };

  const getBatchName = (batchId) => {
    const batch = batches.find((batch) => batch.batch_id === batchId);
    return batch ? batch.batch_name : "not found";
  };

  const getCampName = (campId) => {
    const camp = camps.find((camp) => camp.camp_id === campId);
    return camp ? camp.camp_name : "not found";
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
      {/* Payment Form */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header
              className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Enter Your Details
              </h2>
            </header>
            <div className="overflow-x-auto">
              <form className="  rounded px-8 pt-6 pb-8 mb-4">
                <div className="grid grid-cols-3 gap-4">
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
                      value={formData.first_name}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="First Name"
                      onChange={handleChange}
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
                      value={formData.middle_name}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Middle Name"
                      onChange={handleChange}
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
                      value={formData.last_name}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Last Name"
                      onChange={handleChange}
                    />
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
                    />
                  </div>
                </div>
                {/* Parents/Guardians and Address */}
                <div className="grid grid-cols-2 gap-4">
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
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      value={formData.address}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Address"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Date of Birth
                  </label>
                  <DatePicker
                    label="Controlled picker"
                    value={formData.dob}
                    placeholder="dob"
                    name="dob"
                    onChange={(date) => setFormData({ ...formData, dob: date })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                    >
                      {/* Options for Camp Category */}
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="school_name"
                      className="block text-sm font-medium text-gray-600"
                    >
                      School
                    </label>
                    <input
                      id="school_name"
                      name="school_name"
                      value={formData.school_name}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="School Name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="standard"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Standard
                    </label>
                    <input
                      id="standard"
                      name="standard"
                      value={formData.standard}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Standard"
                      onChange={handleChange}
                    />
                  </div>
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
                    />
                  </div>
                </div>

                {/* <div className="grid grid-cols-3 gap-4">
                  <div className="mb-4">
                    <label htmlFor="parents_name" className="block text-sm font-medium text-gray-600">Parents Name</label>
                    <input id="parents_name" name='parents_name' value={formData.parents_name} type="text" className="w-full px-3 py-2 border rounded shadow appearance-none" placeholder="Parent's Name" onChange={handleChange} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="parents_phn" className="block text-sm font-medium text-gray-600">Parents Phone</label>
                    <input id="parents_phn" name='parents_phn' value={formData.parents_phn} type="text" className="w-full px-3 py-2 border rounded shadow appearance-none" placeholder="Parent's Phone" onChange={handleChange} />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="parents_email" className="block text-sm font-medium text-gray-600">Parents Email</label>
                    <input id="parents_email" name='parents_email' value={formData.parents_email} type="text" className="w-full px-3 py-2 border rounded shadow appearance-none" placeholder="Parent's Email" onChange={handleChange} />
                  </div>
                </div> */}

                {/* Father's and Mother's Occupation */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="fatherOccupation"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Father's Occupation
                    </label>
                    <input
                      id="fatherOccupation"
                      name="fathers_occupation"
                      value={formData.fathers_occupation}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Father's Occupation"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="motherOccupation"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Mother's Occupation
                    </label>
                    <input
                      id="motherOccupation"
                      name="mothers_occupation"
                      value={formData.mothers_occupation}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Mother's Occupation"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* How You Got to Know and MCF Employee */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="howYouKnow"
                      className="block text-sm font-medium text-gray-600"
                    >
                      How You Got to Know about MCF Camp
                    </label>
                    <input
                      id="howYouKnow"
                      name="how_you_got_to_know"
                      value={formData.how_you_got_to_know}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="How You Got to Know"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="mcfEmployee"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Name of the MCF Employee Who Reached Out to You
                    </label>
                    <input
                      id="mcfEmployee"
                      name="employee_who_reached_out_to_you"
                      value={formData.employee_who_reached_out_to_you}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="MCF Employee's Name"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* District, State, and Pincode */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium text-gray-600"
                    >
                      District
                    </label>
                    <input
                      id="district"
                      name="district"
                      value={formData.district}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="District"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-600"
                    >
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      value={formData.state}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="State"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Pincode
                    </label>
                    <input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Pincode"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <hr className="my-4 h-1 bg-gray-200" />
                <div className="mb-4">
                  <label
                    htmlFor="camp_category"
                    className="block text-lg font-medium text-gray-600"
                  >
                    Camp Name
                  </label>
                  <select
                    id="camp_name"
                    name="camp_name"
                    value={selectedCamp}
                    onChange={(e) => setSelectedCamp(e.target.value)}
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  >
                    {/* Options for Camp Category */}
                    <option value="">Select Camp Name</option>
                    {camps.map((camp) => (
                      <option value={camp.camp_name}>{camp.camp_name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="camp_category"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Camp Category
                  </label>
                  <select
                    id="camp_category"
                    name="camp_category"
                    value={formData.camp_category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  >
                    {/* Options for Camp Category */}
                    <option value="">Select Camp Category</option>
                    <option value="DIWALI">DIWALI</option>
                    <option value="CHS">CHS</option>
                    <option value="SUMMER">SUMMER</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="batch_name"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Batch
                  </label>
                  <select
                    id="batch_name"
                    name="batch_name"
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  >
                    {/* Options for Batch */}
                    <option value="">Select Batch Name</option>
                    {batches.map((batch) => (
                      <option value={batch.batch_name}>
                        {batch.batch_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Start Date
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      value={
                        batch.start_date ? convertDate(batch.start_date) : ""
                      }
                      type="date"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Start Date"
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-600"
                    >
                      End Date
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      value={batch.end_date ? convertDate(batch.end_date) : ""}
                      type="date"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="End Date"
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      value={formData.company}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Company"
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Duration
                    </label>
                    <input
                      id="duration"
                      name="duration"
                      value={batch.duration}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Duration"
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="food_option"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Food Option
                  </label>
                  <select
                    id="food_option"
                    name="food_option"
                    value={formData.food_option}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  >
                    {/* Options for Food Option */}
                    <option value="">Select Food Option </option>
                    <option value="VEG">VEG </option>
                    <option value="JAIN">JAIN </option>
                  </select>
                </div>
                {/* <div className="mb-4">
                  <label htmlFor="dress_code" className="block text-sm font-medium text-gray-600">
                    Dress Code
                  </label>
                  <select
                    id="dress_code"
                    name="dress_code"
                    value={formData.dress_code}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  > */}
                {/* Options for Dress Code */}
                {/* <option value="">Select Dress Code </option>
                    <option value="trackSuit">TRACK SUIT</option>
                    <option value="combatDress">COMBAT DRESS </option>
                    <option value="cheetaDress">CHEETA DRESS</option>
                    <option value="blackDress">BLACK DRESS </option>
                  </select>
                </div> */}
                <div className="mb-4">
                  <label
                    htmlFor="pick_up_city"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Pick Up City
                  </label>
                  <select
                    id="pick_up_city"
                    name="pick_up_city"
                    value={formData.pick_up_city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  >
                    {/* Options for Dress Code */}
                    <option value="">Select Pick Up City </option>
                    <option value="SELF-DROP">Self Drop </option>
                    <option value="MUMBAI">Mumbai</option>
                    <option value="PUNE">Pune </option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="pick_up_point"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Pick Up Point
                  </label>
                  <select
                    id="pick_up_point"
                    name="pick_up_point"
                    value={formData.pick_up_point}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  >
                    {/* Options for Dress Code */}
                    <option value="">Select Pick Up Point </option>
                    {formData.pick_up_city === "MUMBAI" ? (
                      mumbaiPickupLocations.map((location) => (
                        <option value={location}>{location}</option>
                      ))
                    ) : (
                      <option value={"SELF-DROP"}>Self Drop</option>
                    )}
                    {formData.pick_up_city === "PUNE"
                      ? punePickupLocations.map((location) => (
                          <option value={location}>{location}</option>
                        ))
                      : ""}
                  </select>
                </div>
                <hr className="my-4 h-1 bg-gray-200" />
                <div className="mb-4">
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Height
                  </label>
                  <input
                    id="height"
                    name="height"
                    value={formData.height}
                    type="text"
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                    placeholder="Height in cm"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Weight
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    type="text"
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                    placeholder="Weight in Kg"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="blood_group"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Blood Group
                  </label>
                  {/* <input id="blood_group" name='blood_group' value={formData.blood_group} type="text" className="w-full px-3 py-2 border rounded shadow appearance-none" placeholder="Blood Group" onChange={handleChange} />  */}
                  <select
                    id="blood_group"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  >
                    {/* Options for Blood Group */}
                    <option value="">Select Blood Group </option>
                    <option value="A+">A+</option>
                    <option value="B+">B+ </option>
                    <option value="AB+">AB+</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B- </option>
                    <option value="AB-">AB-</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Health</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <label htmlFor="physical_problem">
                        Define Physical Problem
                      </label>
                      <input
                        type="text"
                        id="physical_problem"
                        name="physical_problem"
                        value={formData.physical_problem}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="allergy">Define Allergy</label>
                      <input
                        type="text"
                        id="allergy"
                        name="allergy"
                        value={formData.allergy}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="other_problem">
                        Define Other Problem
                      </label>
                      <input
                        type="text"
                        id="other_problem"
                        name="other_problem"
                        value={formData.other_problem}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="medication_physical">
                        Medication For Physical Problem
                      </label>
                      <input
                        type="text"
                        id="medication_physical"
                        name="medication_physical"
                        value={formData.medication_physical}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="medication_allergy">
                        Medication For Allergy
                      </label>
                      <input
                        type="text"
                        id="medication_allergy"
                        name="medication_allergy"
                        value={formData.medication_allergy}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="medication_other">
                        Medication For Other Problem
                      </label>
                      <input
                        type="text"
                        id="medication_other"
                        name="medication_other"
                        value={formData.medication_other}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-4 h-1 bg-gray-200" />
                <div className="mb-4">
                  <label
                    htmlFor="payment_option"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Payment Options
                  </label>
                  <select
                    id="payment_option"
                    name="payment_option"
                    value={formData.payment_option}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  >
                    <option value="">Select Payment Options </option>
                    <option value="totalPayment">Total Payment</option>
                    {/* <option value="1installment">1 installment </option> */}
                    <option value="2installment">2 installments </option>
                    {/* <option value="booking">Booking</option> */}
                    <option value="3installment">3 installments </option>
                    {/* <option value="4installment">4 installments </option> */}
                  </select>
                </div>
                {/* <div className="mb-4 flex items-center">
                  <label
                    htmlFor="cadetPhoto"
                    className="block text-sm font-medium text-gray-600 mr-2"
                  >
                    Medical Certificate
                  </label>
                  <button style={{marginLeft:20}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" onClick={() => window.open(formData.medicalCertificate, "_blank")}>
                    View
                  </button>
                </div> */}
                <br />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="mb-4 flex items-center">
                    <label
                      htmlFor="cadetPhoto"
                      className="block text-sm font-medium text-gray-600 mr-2"
                    >
                      Cadet Photo
                    </label>
                    <a
                      style={{ marginLeft: 70 }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      href={formData.cadetPhoto}
                      target="_blank"
                    >
                      View
                    </a>
                  </div>
                  <div className="mb-4 flex items-center">
                    <label
                      htmlFor="cadetPhoto"
                      className="block text-sm font-medium text-gray-600 mr-2"
                    >
                      Cadet Sign
                    </label>
                    <a
                      style={{ marginLeft: 70 }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      href={formData.cadetSign}
                      target="_blank"
                    >
                      View
                    </a>
                  </div>
                  <div className="mb-4 flex items-center">
                    <label
                      htmlFor="cadetPhoto"
                      className="block text-sm font-medium text-gray-600 mr-2"
                    >
                      Parent/Gurdian Photo
                    </label>
                    <a
                      style={{ marginLeft: 10 }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      href={formData.parentGurdianPhoto}
                      target="_blank"
                    >
                      View
                    </a>
                  </div>
                  <div className="mb-4 flex items-center">
                    <label
                      htmlFor="cadetPhoto"
                      className="block text-sm font-medium text-gray-600 mr-2"
                    >
                      Parent-Gurdian Sign
                    </label>
                    <a
                      style={{ marginLeft: 8 }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      href={formData.parentGurdianSign}
                      target="_blank"
                    >
                      View
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <button
          onClick={handleUpdate}
          className="btn-primary"
          style={{
            padding: "5px 10px",
            background: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          {loading ? <Loader2Icon className="animate-spin" /> : "Update"}
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
          Student Updated Successfully!!
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
          Error Updating Student!!
        </Alert>
      </Snackbar>
    </div>
  );
};
