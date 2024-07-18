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
import { baseurl } from "../../utils/domain";

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
  const getCampName = (campId) => {
    const camp = camps.find((camp) => camp.id === campId);
    return camp ? camp.name : "Camp not found";
  };

  const getCampPrice = (campId) => {
    const camp = camps.find((camp) => camp.camp_id === campId);
    return camp ? camp.camp_fee : "no found";
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
    dob: "",
    address: "",
    fathers_occupation: "",
    mothers_occupation: "",
    how_you_got_to_know: "",
    employee_who_reached_out_to_you: "",
    district: "",
    state: "",
    pincode: "", // New camp field
    school_name: "",
    standard: "",
    wp_no: "",
    // parents_name: '',
    // parents_phn: '',
    // parents_email: '',
  });

  const [camp, setCamp] = useState({});
  const [camp_category, setCampCategory] = useState("");

  const [admissionFormData, setAdmissionFormData] = useState({
    admissionType: "",
    camp_category: "",
    batch_id: "",
    selectedDate: "",
    food_option: "",
    // dress_code: "",
    pick_up_city: "",
    pick_up_point: "",
    height: "",
    weight: "",
    blood_group: "",
    gender: "",
    payment_option: "",
  });

  const [healthData, setHealthData] = useState({
    physical_problem: "",
    allergy: "",
    other_problem: "",
    medication_physical: "",
    medication_allegric: "",
    medication_other: "",
  });

  const handleHealthChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setHealthData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [files, setFiles] = useState({
    // medicalCertificate: "",
    cadetPhoto: "",
    cadetSign: "",
    parentGurdianPhoto: "",
    parentGurdianSign: "",
  });

  useEffect(() => {
    console.log(files);
  }, [files]);

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const f = new FormData();
    f.append("file", files[0]);
    const res = await axios.post(`https://${baseurl}/uploadFile`, f);
    setFiles((prev) => {
      return {
        ...prev,
        [name]: res.data.file_url,
      };
    });
  };

  const [campId, setCampId] = useState("");
  const [campFee, setCampFee] = useState(0);

  useEffect(() => {
    if (admissionFormData.camp_name) {
      const selectedCamp = camps.find(
        (camp) => camp.camp_name === admissionFormData.camp_name
      );
      if (selectedCamp) {
        setCampId(selectedCamp.camp_id);
        admissionFormData["camp_id"] = selectedCamp.camp_id;
        setCampFee(getCampPrice(selectedCamp.camp_id));
      }
    }
  }, [admissionFormData.camp_name, camps]);

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(
          `https://${baseurl}/getActiveBatches?camp_id=${campId}`
        );
        setBatches(response.data.batches);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchBatches();
  }, [campId, admissionFormData.camp_name]);

  const [batchId, setBatchId] = useState("");
  const [batch, setBatch] = useState({});

  useEffect(() => {
    if (admissionFormData.batch) {
      const selectedBatch = batches.find(
        (batch) => batch.batch_name === admissionFormData.batch
      );
      if (selectedBatch) {
        setBatchId(selectedBatch.batch_id);
        admissionFormData["batch_id"] = selectedBatch.batch_id;

        console.log("batchid: " + selectedBatch.batch_id);
      }
    }
  }, [admissionFormData.batch, batches]);

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const response = await axios.get(
          `https://${baseurl}/getBatch?batch_id=${batchId}`
        );
        setBatch(response.data.batch);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    if (batchId) {
      fetchBatch();
    }
  }, [batchId]);

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
      let date = new Date(formData["dob"]); // assuming formData[key] is the date you're referring to
      let day = ("0" + date.getDate()).slice(-2); // get the day as a string in the format DD
      let month = ("0" + (date.getMonth() + 1)).slice(-2); // get the month as a string in the format MM
      let year = date.getFullYear(); // get the year as a string in the format YYYY

      let formattedDate = `${day}-${month}-${year}`;
      formData["dob"] = formattedDate; // combine them all together in the format DD-MM-YYYY

      const len = Object.keys(formData).length;

      for (let key in formData) {
        reqData.append(key, formData[key]);
      }

      for (let key in admissionFormData) {
        reqData.append(key, admissionFormData[key]);
      }
      for (let key in healthData) {
        reqData.append(key, healthData[key]);
      }
      for (let key in files) {
        reqData.append(key, files[key]);
      }

      reqData.append("discount_code", discountCode);
      reqData.append("discount_amount", discountAmount);
      reqData.append("camp_fee", getCampPrice(campId));
      reqData.append("total_amount_payable", campFee);
      reqData.append("company", company);

      const response = await axios.post(
        `https://${baseurl}/registerStudent`,
        reqData
      );

      console.log(response.data); // Log the response from the server
      setLoading(false);
      setState({ vertical: "bottom", horizontal: "right", open: true });
      navigate("/RegStudent");
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
                  </div>
                  {/* Parents/Guardians and Address */}
                  <div className="grid-cols-1 grid md:grid-cols-2 gap-4">
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
                        value={formData.address.toUpperCase()}
                        type="text"
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        placeholder="Address"
                        onChange={handleChange}
                        required
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
                      placeholder="Date of Birth"
                      name="dob"
                      onChange={(date) =>
                        setFormData({ ...formData, dob: date })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        value={formData.school_name.toUpperCase()}
                        type="text"
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        placeholder="School Name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="standard"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Standard
                      </label>
                      <select
                        id="standard"
                        name="standard"
                        value={formData.standard}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Standard</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (standard) => (
                            <option key={standard} value={standard}>
                              {standard}
                            </option>
                          )
                        )}
                      </select>
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
                        required
                      />
                    </div>
                  </div>
                  {/* Father's and Mother's Occupation */}
                  {/*  */}

                  {/* <div className="grid grid-cols-3 gap-4">
                  <div className="mb-4">
                    <label htmlFor="parents_name" className="block text-sm font-medium text-gray-600">Parents Name</label>
                    <input id="parents_name" name='parents_name' value={formData.parents_name.toUpperCase()} type="text" className="w-full px-3 py-2 border rounded shadow appearance-none" placeholder="Parent's Name" onChange={handleChange} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="parents_phn" className="block text-sm font-medium text-gray-600">Parents Phone</label>
                    <input id="parents_phn" name='parents_phn' value={formData.parents_phn} type="text" className="w-full px-3 py-2 border rounded shadow appearance-none" placeholder="Parent's Phone" onChange={handleChange} required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="parents_email" className="block text-sm font-medium text-gray-600">Parents Email</label>
                    <input id="parents_email" name='parents_email' value={formData.parents_email} type="text" className="w-full px-3 py-2 border rounded shadow appearance-none" placeholder="Parent's Email" onChange={handleChange} />
                  </div>
                </div> */}

                  {/*  */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        value={formData.fathers_occupation.toUpperCase()}
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
                        value={formData.mothers_occupation.toUpperCase()}
                        type="text"
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        placeholder="Mother's Occupation"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* How You Got to Know and MCF Employee */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="howYouKnow"
                        className="block text-sm font-medium text-gray-600"
                      >
                        How You Got to Know about MCF Camp
                      </label>
                      <select
                        id="howYouKnow"
                        name="how_you_got_to_know"
                        value={formData.how_you_got_to_know}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="FACEBOOK">Facebook</option>
                        <option value="INSTA">Instagram</option>
                        <option value="YOUTUBE">YouTube</option>
                        <option value="FRIEND">Friend</option>
                        <option value="BANNER">Banner</option>
                        <option value="PAPER">Newspaper</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="mcfEmployee"
                        className="block text-sm font-medium text-gray-600 required"
                      >
                        Name of the MCF Employee Who Reached Out to You
                      </label>
                      <select
                        id="mcfEmployee"
                        name="employee_who_reached_out_to_you"
                        value={formData.employee_who_reached_out_to_you}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="ADM . POONAM MAM">
                          ADM . POONAM MAM
                        </option>
                        <option value="ADM. DIVYA MAM">
                          ADM. DAKSHATA MAM
                        </option>
                        <option value="ADM. ANJANA MAM">ADM. ANJANA MAM</option>
                        <option value="ADM. SHARAYU MAM">
                          ADM. SHARAYU MAM
                        </option>
                        <option value="ADM. BHAGYASHREE MAM">
                          ADM. BHAGYASHREE MAM
                        </option>
                        <option value="TL. TEJASWINI WAGHMODE">
                          TL. TEJASWINI WAGHMODE
                        </option>
                        <option value="TL. MAYUR BALASAHEB KUTE">
                          TL. MAYUR BALASAHEB KUTE
                        </option>
                        <option value="TL. PREEJA SASHIDHARAN NAIR">
                          TL. PREEJA SASHIDHARAN NAIR
                        </option>
                        <option value="TL. SACHIN SHIVAJIRAO CHALKE">
                          TL. SACHIN SHIVAJIRAO CHALKE
                        </option>
                        <option value="TL. SACHIN MANJUNATH KANNUR">
                          TL. SACHIN MANJUNATH KANNUR
                        </option>
                        <option value="TL. ROOPESH GURUNATH TORASKAR">
                          TL. ROOPESH GURUNATH TORASKAR
                        </option>
                        <option value="TL. NILESH DNYANESHWAR PATIL">
                          TL. NILESH DNYANESHWAR PATIL
                        </option>
                        <option value="TL. ISHRA ASLAM MULLA">
                          TL. ISHRA ASLAM MULLA
                        </option>
                        <option value="TL. JASMIN NURUL HASAN KADRI">
                          TL. JASMIN NURUL HASAN KADRI
                        </option>
                        <option value="TL. ANAND WAMAN MORE">
                          TL. ANAND WAMAN MORE
                        </option>
                        <option value="TL. ADINATH ASHOK JADHAV">
                          TL. ADINATH ASHOK JADHAV
                        </option>
                        <option value="TL. SHAMBHURAJE ANNA SALUNKHE">
                          TL. SHAMBHURAJE ANNA SALUNKHE
                        </option>
                        <option value="TL. PRANAV PANDUANG BHORE">
                          TL. PRANAV PANDUANG BHORE
                        </option>
                        <option value="OTHER MCF STAFF">OTHER MCF STAFF</option>
                      </select>
                    </div>
                  </div>

                  {/* District, State, and Pincode */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                        value={formData.district.toUpperCase()}
                        type="text"
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        placeholder="District"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-600"
                      >
                        State
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded shadow appearance-none"
                        required
                      >
                        <option value="">Select a state</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli">
                          Dadra and Nagar Haveli
                        </option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Puducherry">Puducherry</option>
                      </select>
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
                        required
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
                      value={admissionFormData.camp_name}
                      onChange={(e) =>
                        handleAdmissionChange("camp_name", e.target.value)
                      }
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
                      value={admissionFormData.camp_category}
                      onChange={(e) =>
                        handleAdmissionChange("camp_category", e.target.value)
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
                      <option value="">Select Batch Name</option>
                      {batches.map((batch) => (
                        <option value={batch.batch_name}>
                          {batch.batch_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                        value={
                          batch.end_date ? convertDate(batch.end_date) : ""
                        }
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
                        value={company}
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
                      value={admissionFormData.food_option}
                      onChange={(e) =>
                        handleAdmissionChange("food_option", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                    >
                      {/* Options for Food Option */}
                      <option value="">Select Food Option </option>
                      <option value="veg">VEG </option>
                      <option value="jain">JAIN </option>
                    </select>
                  </div>

                  {/* <div className="mb-4">
                  <label
                    htmlFor="dress_code"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Dress Code
                  </label>
                  <select
                    id="dress_code"
                    name="dress_code"
                    value={admissionFormData.dress_code}
                    onChange={(e) =>
                      handleAdmissionChange("dress_code", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  >
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
                      value={admissionFormData.pick_up_city}
                      onChange={(e) =>
                        handleAdmissionChange("pick_up_city", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                    >
                      {/* Options for Dress Code */}
                      <option value="">Select Pick Up City </option>
                      <option value="self-drop">Self Drop </option>
                      <option value="mumbai">Mumbai</option>
                      <option value="pune">Pune </option>
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
                      value={admissionFormData.pick_up_point}
                      onChange={(e) =>
                        handleAdmissionChange("pick_up_point", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                    >
                      {/* Options for Dress Code */}
                      <option value="">Select Pick Up Point </option>
                      {admissionFormData.pick_up_city === "mumbai"
                        ? mumbaiPickupLocations.map((location) => (
                            <option value={location}>{location}</option>
                          ))
                        : ""}
                      {admissionFormData.pick_up_city === "pune"
                        ? punePickupLocations.map((location) => (
                            <option value={location}>{location}</option>
                          ))
                        : ""}
                      {admissionFormData.pick_up_city === "self-drop"
                        ? selfPickupLocations.map((location) => (
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
                      value={admissionFormData.height}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Height in cm"
                      onChange={(e) =>
                        handleAdmissionChange("height", e.target.value)
                      }
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
                      value={admissionFormData.weight}
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Weight in Kg"
                      onChange={(e) =>
                        handleAdmissionChange("weight", e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="blood_group"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Blood Group
                    </label>
                    {/* <input
                    id="blood_group"
                    name="blood_group"
                    value={admissionFormData.blood_group}
                    type="text"
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                    placeholder="Blood Group"
                    onChange={(e) =>
                      handleAdmissionChange("blood_group", e.target.value)
                    }
                  /> */}
                    <select
                      id="blood_group"
                      name="blood_group"
                      value={admissionFormData.blood_group}
                      onChange={(e) =>
                        handleAdmissionChange("blood_group", e.target.value)
                      }
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
                    {/* Options for Blood Group */}
                  </div>

                  {/* <div className="mb-4">
                  <label
                    htmlFor="medicalCertificate"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Medical Certificate
                  </label>
                  <input
                    type="file"
                    id="medicalCertificate"
                    name="medicalCertificate"
                    onChange={(e) => handleFileChange(e)}
                    className="w-full px-3 py-2 border rounded shadow appearance-none"
                  />
                </div> */}

                  <hr className="my-4 h-1 bg-gray-200" />

                  {/*add option to uploade files */}
                  <div className="mb-4">
                    <label
                      htmlFor="cadetPhoto"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Cadet Photo
                    </label>
                    <input
                      type="file"
                      id="cadetPhoto"
                      name="cadetPhoto"
                      onChange={(e) => handleFileChange(e)}
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      accept="image/*"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="cadetSign"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Cadet Sign
                    </label>
                    <input
                      type="file"
                      id="cadetSign"
                      name="cadetSign"
                      onChange={(e) => handleFileChange(e)}
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      accept="image/*"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="parentGurdianPhoto"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Parent/Gurdian Photo
                    </label>
                    <input
                      type="file"
                      id="parentGurdianPhoto"
                      name="parentGurdianPhoto"
                      onChange={(e) => handleFileChange(e)}
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      accept="image/*"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="parentGurdianSign"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Parent-Gurdian Sign
                    </label>
                    <input
                      type="file"
                      id="parentGurdianSign"
                      name="parentGurdianSign"
                      onChange={(e) => handleFileChange(e)}
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      accept="image/*"
                    />
                  </div>

                  <hr className="my-4 h-1 bg-gray-200" />
                  {/* <div className="mb-4">
                    <label
                      htmlFor="payment_option"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Payment Options
                    </label>
                    <select
                      id="payment_option"
                      name="payment_option"
                      value={admissionFormData.payment_option}
                      onChange={(e) =>
                        handleAdmissionChange("payment_option", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                    >
                      
                      <option value="">Select Payment Options </option>
                      <option value="totalPayment">Total Payment</option>
                      <option value="1installment">1 installment </option>
                      <option value="2installment">2 installments </option>
                      <option value="booking">Booking</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="discount_code"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Discount Code
                    </label>
                    <select
                      name="discount_code"
                      id="discount_code"
                      defaultValue="discount code"
                      onChange={(e) => setDiscountCode(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Select an option
                      </option>
                      {discountCodes.map((code) => (
                        <option value={code.discount_code}>
                          {code.discount_code}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClick={(e) => {
                        axios
                          .post(`https://${baseurl}/checkDiscountCode`, {
                            discount_code: discountCode,
                          })
                          .then((res) => {
                            if (res.data.success) {
                              setDiscountAmount(res.data.discount_amount);
                              alert(
                                `Congratulations! You got a discount of ${res.data.discount_amount}`
                              );
                              setCampFee(
                                (prev) =>
                                  prev - parseInt(res.data.discount_amount)
                              );
                              console.log(res.data.discount_amount);
                              console.log(campFee);
                            } else {
                              alert("Invalid Code");
                              setDiscountCode("");
                              setDiscountAmount(0);
                            }
                          });
                      }}
                    >
                      check
                    </Button>
                  </div> */}
                  {/* <div className="flex flex-col mb-2 text-md">
                    <label htmlFor="final_price" className="font-bold ">
                      Final Price
                    </label>
                    <input
                      type="number"
                      id="final_price"
                      name="final_price"
                      className=" px-3 py-2 border rounded shadow appearance-none"
                      value={campFee}
                      disabled
                    />
                  </div> */}

                  <div>
                    <h2 className="text-xl font-bold">Health</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <label htmlFor="physical_problem">
                          Define Physical Problem
                        </label>
                        <input
                          placeholder="Define Physical Problem"
                          type="text"
                          id="physical_problem"
                          name="physical_problem"
                          value={healthData.physical_problem}
                          onChange={(e) => handleHealthChange(e)}
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="allergy">Define Allergy</label>
                        <input
                          placeholder="Define Allergy"
                          type="text"
                          id="allergy"
                          name="allergy"
                          value={healthData.allergy}
                          onChange={(e) => handleHealthChange(e)}
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="other_problem">
                          Define Other Problem
                        </label>
                        <input
                          placeholder="Define Other Problem"
                          type="text"
                          id="other_problem"
                          name="other_problem"
                          value={healthData.other_problem}
                          onChange={(e) => handleHealthChange(e)}
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="medication_physical">
                          Medication For Physical Problem
                        </label>
                        <input
                          placeholder="Medication For Physical Problem"
                          type="text"
                          id="medication_physical"
                          name="medication_physical"
                          value={healthData.medication_physical}
                          onChange={(e) => handleHealthChange(e)}
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="medication_allergy">
                          Medication For Allergy
                        </label>
                        <input
                          placeholder="Medication For Allergy"
                          type="text"
                          id="medication_allergy"
                          name="medication_allergy"
                          value={healthData.medication_allergy}
                          onChange={(e) => handleHealthChange(e)}
                          className="w-full px-3 py-2 border rounded shadow appearance-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="medication_other">
                          Medication For Other Problem
                        </label>
                        <input
                          placeholder="Medication For Other Problem"
                          type="text"
                          id="medication_other"
                          name="medication_other"
                          value={healthData.medication_other}
                          onChange={(e) => handleHealthChange(e)}
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
                      value={admissionFormData.payment_option}
                      onChange={(e) =>
                        handleAdmissionChange("payment_option", e.target.value)
                      }
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
                  <div className="p-4">
                    <div className="overflow-x-auto text-xs">
                      {/* Terms and services*/}
                      <h1 className="text-2xl font-bold mb-4">
                        RULES AND REGULATIONS FOR CAMPAIGN
                      </h1>
                      <ul className="list-disc pl-6 mb-4">
                        <li>
                          Age limit for all the camps is strictly between 7 to
                          21 years.
                        </li>
                        <li>
                          It is a Commando Training Camp and not a Luxurious
                          relaxing vacation. Discipline is a must. *Soldier
                          Cut/Military Cut is Compulsory for Boys. Nails to be
                          trimmed properly.
                        </li>
                        <li>
                          Any expensive things such as Gold, Money, or any
                          Electronic Gadgets are not allowed in the Camp.
                        </li>
                        <li>
                          Abusive Language, Bad Words, any type of Addiction,
                          and Fighting, if it happens in the Camp, then that
                          child will be rusticated from the Camp.
                        </li>
                        <li>
                          Students need to take care of their provisions, food,
                          etc., until they reach the camp.
                        </li>
                        <li>
                          Junk Food is strictly prohibited in the camp. You may
                          send healthy snacks like dry fruits or homemade
                          healthy snacks.
                        </li>
                        <li>
                          Parents are allowed to call their wards only on
                          mentioned/given scheduled days.
                        </li>
                        <li>
                          Parents would be notified by a message from MCF for
                          the arrival of the cadet on the first day and
                          departure timing on the last day of the camp. Please
                          don't expect calls on the same.
                        </li>
                        <li>
                          For a 7-day camp, the calling schedule will be
                          alternate day from the 2nd day, 4th day, and 6th day,
                          between 12.00 am to 3.00 pm. If students have any
                          complaints or requirements, then tell them to inform
                          us. Cadets will be handed over to the parents at the
                          camp place after the closing ceremony. Remaining kids
                          will be dropped by MCF (whatever committed pick-up &
                          drop place). If students have any complaints or
                          requirements, then tell them to inform us.
                        </li>
                        <li>
                          If anyone has any complaint or suggestion about this
                          Camp, then contact us at 9604082000 from 9 am to 12:30
                          pm. After that, calls will not be received.
                        </li>
                        <li>
                          Fees once paid are Non-Refundable and
                          Non-Transferable.
                        </li>
                      </ul>
                      <h1 className="text-2xl font-bold mb-4">
                        DECLARATION OF PARENTS/GUARDIANS
                      </h1>
                      <ul className="list-disc pl-6 mb-4">
                        <li>
                          This is a Commando Training Camp, not a Luxurious one,
                          and I am very well aware of it. I am sending my child
                          of my own free will.
                        </li>
                        <li>
                          I will not claim to MCF for any Natural Calamity or
                          Natural Accident that may happen. My child is
                          physically and mentally prepared for this Camp, and I
                          have provided them with the information about the
                          situation of the Camp. I know that fees once paid are
                          non-refundable under any condition.
                        </li>
                        <li>
                          I have carefully read and accepted all the above rules
                          and regulations.
                        </li>
                      </ul>
                      <h1 className="text-2xl font-bold mb-4">
                        INDEMNITY BOND AND CERTIFICATE
                      </h1>
                      <ul className="list-disc pl-6 mb-4">
                        <li>
                          I confirm that my ward/son/daughter is physically and
                          medically fit to undertake the rigorous training of
                          the course.
                        </li>
                        <li>
                          I hereby declare that I shall not hold MCF CAMP or the
                          instructors or any staff wholly or partially, either
                          individually or jointly responsible for any injury,
                          accident, or sickness caused to my ward/son/daughter
                          during the course of the camp.
                        </li>
                        <li>
                          I agree to adhere strictly to the rules and discipline
                          of the course and abide by the directions of the
                          organizing authority or the nominee at all times
                          during the course. Failing to do so may result in
                          expulsion. In case of any injury, accident, or
                          sickness of any member of my family, I shall not hold
                          MCF CAMP or the instructors or any staff wholly or
                          partially, either individually or jointly responsible,
                          and no compensation will be claimed by me.
                        </li>
                        <li>
                          I hereby declare that to the best of my knowledge, I
                          do not suffer from any ailment or disability likely to
                          handicap me in undergoing the course. I am taking part
                          in this course at my own risk.
                        </li>
                        <li>
                          This indemnity bond/certificate is given by me with
                          due diligence and based on the information imparted to
                          me by MCF CAMP authorities.
                        </li>
                      </ul>
                    </div>
                    <label>
                      <input
                        type="checkbox"
                        name="accept"
                        id="accept-checkbox"
                      />
                      {""} I accept
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around ">
        <button
          className="btn-secondary mr-2"
          style={{
            padding: "5px 10px",
            background: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          Previous
        </button>
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
          {loading ? <Loader2Icon className="animate-spin" /> : "Next"}
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
