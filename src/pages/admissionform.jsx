import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-flatpickr";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { baseurl } from "../utils/domain";

const AdmissionForm = () => {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phn: "",
    dob: "",
    address: "",
    fathers_occupation: "",
    mothers_occupation: "",
    how_you_got_to_know: "",
    employee_who_reached_out_to_you: "",
    district: "",
    state: "",
    pincode: "",
  });

  const [admissionFormData, setAdmissionFormData] = useState({
    admissionType: "",
    campCategory: "",
    batch: "",
    selectedDate: "",
    foodOption: "",
    dressCode: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format the date
      let date = new Date(formData["dob"]);
      let day = ("0" + date.getDate()).slice(-2);
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let year = date.getFullYear();
      let formattedDate = `${day}-${month}-${year}`;
      formData["dob"] = formattedDate;

      const reqData = new FormData();

      // Append form data to request data
      for (let key in formData) {
        reqData.append(key, formData[key]);
      }

      const response = await axios.post(
        `https://${baseurl}/registerStudent`,
        reqData
      );

      console.log(response.data);

      // Reset form data after successful submission
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phn: "",
        dob: "",
        address: "",
        fathers_occupation: "",
        mothers_occupation: "",
        how_you_got_to_know: "",
        employee_who_reached_out_to_you: "",
        district: "",
        state: "",
        pincode: "",
      });

      // Show success message
      setState({ vertical: "bottom", horizontal: "right", open: true });
    } catch (error) {
      // Show error message
      setErrorState({ vertical: "bottom", horizontal: "right", open: true });
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Admission Form */}
        <main>
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
                          value={formData.first_name.toUpperCase()}
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
                        onChange={(date) =>
                          setFormData({ ...formData, dob: date })
                        }
                      />
                    </div>
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
                    <div className="mb-4">
                      <label
                        htmlFor="admissionType"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Admission Type
                      </label>
                      <select
                        id="admissionType"
                        name="admissionType"
                        value={admissionFormData.admissionType}
                        onChange={(e) =>
                          handleAdmissionChange("admissionType", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      >
                        <option value="">Select Admission Type</option>
                        <option value="newRegistration">
                          New Registration
                        </option>
                        <option value="alreadyRegistered">
                          Already Registered
                        </option>
                        <option value="updateInformation">
                          Update Information
                        </option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="campCategory"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Camp Category
                      </label>
                      <select
                        id="campCategory"
                        name="campCategory"
                        value={admissionFormData.campCategory}
                        onChange={(e) =>
                          handleAdmissionChange("campCategory", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      >
                        {/* Options for Camp Category */}
                        <option value="">Select Camp Category</option>
                        <option value="diwali">DIWALI</option>
                        <option value="chs">CHS</option>
                        <option value="summer">SUMMER</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="batch"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Batch
                      </label>
                      <select
                        id="batch"
                        name="batch"
                        value={admissionFormData.batch}
                        onChange={(e) =>
                          handleAdmissionChange("batch", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      >
                        {/* Options for Batch */}
                        <option value="">Select Batch </option>
                        <option value="3days">3 DAYS </option>
                        <option value="5days">5 DAYS </option>
                        <option value="7days">7 DAYS </option>
                        <option value="10days">10 DAYS </option>
                        <option value="15days">15 DAYS </option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="selectedDate"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Select Date
                      </label>
                      <DatePicker
                        label="Controlled picker"
                        value={admissionFormData.selectedDate}
                        placeholder="Select Date"
                        name="selectedDate"
                        onChange={(date) =>
                          handleAdmissionChange("selectedDate", date)
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="foodOption"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Food Option
                      </label>
                      <select
                        id="foodOption"
                        name="foodOption"
                        value={admissionFormData.foodOption}
                        onChange={(e) =>
                          handleAdmissionChange("foodOption", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      >
                        {/* Options for Food Option */}
                        <option value="">Select Food Option </option>
                        <option value="veg">VEG </option>
                        <option value="jain">JAIN </option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="dressCode"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Dress Code
                      </label>
                      <select
                        id="dressCode"
                        name="dressCode"
                        value={admissionFormData.dressCode}
                        onChange={(e) =>
                          handleAdmissionChange("dressCode", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                      >
                        {/* Options for Dress Code */}
                        <option value="">Select Dress Code </option>
                        <option value="trackSuit">TRACK SUIT</option>
                        <option value="combatDress">COMBAT DRESS </option>
                        <option value="cheetaDress">CHEETA DRESS</option>
                        <option value="blackDress">BLACK DRESS </option>
                      </select>
                    </div>
                    {/* ... */}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around ">
            {/* <button
          className="btn-secondary mr-2"
          style={{
            padding: '5px 10px',
            background: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginRight: '10px',
          }}
        >
          Previous
        </button> */}
            <button
              onClick={handleSubmit}
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
              Next
            </button>
          </div>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
            autoHideDuration={3000}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Student Added Successfully
            </Alert>
          </Snackbar>
          {/* Error Snackbar */}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={errorState.open}
            onClose={handleErrorClose}
            key={vertical + horizontal}
            autoHideDuration={3000}
          >
            <Alert
              onClose={handleErrorClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Enter details first!!
            </Alert>
          </Snackbar>
        </main>
      </div>
    </div>
  );
};

export default AdmissionForm;
