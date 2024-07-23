import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useNavigate } from "react-router-dom";
import BasicModal1 from "../components/Modal1";
import { baseurl } from "../utils/domain";
import * as XLSX from "xlsx";
function Filter() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [regId, setRegId] = useState("");
  const [campName, setCampName] = useState("");
  const [batchName, setBatchName] = useState("");

  console.log(nameFilter);

  // const [showDropdown, setShowDropdown] = useState(false);

  // const handleButtonClick = () => {
  //   setShowDropdown(!showDropdown);
  // };

  // const handleOptionClick = (option) => {
  //   // Handle the click on each option here
  //   console.log(`Selected option: ${option}`);
  //   // You can add logic to perform actions based on the selected option
  // };

  // ...
  const [modalOpen, setModalOpen] = useState({});
  const [activeSid, setActiveSid] = useState(null);

  const handleShow = (sid) => {
    setModalOpen((prev) => ({ ...prev, [sid]: true }));
  };
  const handleClose = (sid) => {
    setModalOpen((prev) => ({ ...prev, [sid]: false }));
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  useEffect(() => {
    const curr = data.map((entry) => {
      return {
        first_name: entry.first_name,
        last_name: entry.last_name,
        pick_up_point: entry.pick_up_point,
        pick_up_city: entry.pick_up_city,
        camp_name: getCampName(entry.camp_id),
        batch_name: getBatchName(entry.batch_id),
      };
    });
    setExcelData(curr);
  }, [data]);

  const punePickupLocations = [
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

  const mumbaiPickupLocations = [
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

  const [body, setBody] = useState({
    sid: "",
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
    camp_name: "",
    batch_name: "",
    company: "",
    pick_up_city: "",
    pick_up_point: "",
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === "pick_up_city") {
      setBody({ ...body, [name]: value, pick_up_point: "" });
      return;
    }
    if (name === "camp_id") {
      const res = await axios.get(
        `https://${baseurl}/getBatches?camp_id=${value}`
      );
      const batches = res.data.batches;
      setBatches(batches);
    }
    setBody({ ...body, [name]: value });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  // import axios from 'axios';
  const [batches, setBatches] = useState([]);

  const [camps, setCamps] = useState([]);

  useEffect(() => {
    async function getAllCamps() {
      const res = await axios.get(`https://${baseurl}/getAllCamps`);
      const camps = res.data.camps;
      // console.log('camps' + camps);
      setCamps(camps);
    }
    getAllCamps();
  }, []);

  const [campbyId, setCampbyId] = useState({});

  function getCampName(camp_id) {
    const cam = camps.find((camp) => {
      if (camp.camp_id === camp_id) {
        return camp.camp_name;
      }
    });
    return cam ? cam.camp_name : "";
  }
  const [allBatches, setAllBatches] = useState([]);
  useEffect(() => {
    async function getAllBatches() {
      const res = await axios.get(`https://${baseurl}/getAllBatches`);
      const batches = res.data.camps;
      setAllBatches(batches);
    }
    getAllBatches();
  }, []);

  function getBatchName(batch_id) {
    const bat = allBatches.find((batch) => {
      if (batch.batch_id === batch_id) {
        return batch.batch_name;
      }
    });
    return bat ? bat.batch_name : "";
  }

  function getBatchDuration(batch_id) {
    const bat = allBatches.find((batch) => {
      if (batch.batch_id === batch_id) {
        return batch.duration;
      }
    });
    return bat ? bat.duration : "";
  }

  // // Usage
  // const camp_id = item.camp_id; // get camp_id from your item
  // const camp_name = await getCampName(camp_id);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `https://${baseurl}/filterStudents`,
        body
      );
      console.log(response.data.students);
      setData(response.data.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`https://${baseurl}/getAllStudents`)
      .then((x) => setData(x.data.students));
  }, []);

  useEffect(() => {
    fetchData();
  }, [body]);

  useEffect(() => {
    axios
      .get(`https://${baseurl}/api/filterbyRegID/${regId}`)
      .then((x) => setData(x.data));
  }, [regId]);

  const handleClick = async (id) => {
    const name = await getCampName(id);
    // const Batchname = await getBatchName(id);

    // setBatchName(Batchname);
    console.log(name);
    setCampName(name);
  };
  const handleClick1 = async (id) => {
    // const name = await getCampName(id);
    const Batchname = await getBatchName(id);

    setBatchName(Batchname);
    // console.log(name);
    // setCampName(name);
  };

  const handleFilterSubmit = () => {
    fetchData();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="text-center my-8">
            <h2 className="text-2xl font-bold">Filter Cadets by</h2>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-4 px-9 justify-center items-center grid-rows-2 gap-4">
              {/* <div>
                <label className="block text-gray-600">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="First name"
                  value={body.first_name}
                  name="first_name"
                  onChange={handleInputChange}
                />
              </div> */}
              {/* <div>
                <label className="block text-gray-600">Middle Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Middle Name"
                  value={body.middle_name}
                  name="middle_name"
                  onChange={handleInputChange}
                />
              </div> */}
              {/* <div>
                <label className="block text-gray-600">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Last Name"
                  value={body.last_name}
                  name="last_name"
                  onChange={handleInputChange}
                />
              </div> */}
              {/* <div>
                <label className="block text-gray-600">Reg Id</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Student Id"
                  value={body.sid}
                  name="sid"
                  onChange={handleInputChange}
                />
              </div> */}
              {/* <div>
                <label className="block text-gray-600">E-mail</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="email"
                  value={body.email}
                  name="email"
                  onChange={handleInputChange}
                />
              </div> */}
              <div className="">
                <label
                  htmlFor="pick_up_city"
                  className="block text-sm font-medium text-gray-600"
                >
                  Pick Up City
                </label>
                <select
                  id="pick_up_city"
                  name="pick_up_city"
                  // value={body.pick_up_city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none"
                >
                  {/* Options for Dress Code */}
                  <option value="">Select Pick Up City </option>
                  <option value="mumbai">Mumbai</option>
                  <option value="pune">Pune </option>
                </select>
              </div>

              <div className="">
                <label
                  htmlFor="pick_up_point"
                  className="block text-sm font-medium text-gray-600"
                >
                  Pick Up Point
                </label>
                <select
                  id="pick_up_point"
                  name="pick_up_point"
                  // value={body.pick_up_point}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none"
                >
                  {/* Options for Dress Code */}
                  <option value="">Select Pick Up Point </option>
                  {body.pick_up_city === "mumbai"
                    ? mumbaiPickupLocations.map((location) => (
                        <option value={location}>{location}</option>
                      ))
                    : ""}
                  {body.pick_up_city === "pune"
                    ? punePickupLocations.map((location) => (
                        <option value={location}>{location}</option>
                      ))
                    : ""}
                </select>
              </div>

              {/* <div>
                <label className="block text-gray-600">Phone</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Phone"
                  value={body.phn}
                  name="phn"
                  onChange={handleInputChange}
                />
              </div> */}

              <div>
                <label
                  htmlFor="camp_category"
                  // className="block text-lg font-medium text-gray-600"
                >
                  Camp Name
                </label>
                <select
                  id="camp_name"
                  name="camp_id"
                  // value={body.camp_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none"
                >
                  {/* Options for Camp Category */}
                  <option value="">Select Camp Name</option>
                  {camps.map((camp) => (
                    <option value={camp.camp_id}>{camp.camp_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="batch"
                  className="block text-sm font-medium text-gray-600"
                >
                  Batch
                </label>
                <select
                  id="batch"
                  name="batch_id"
                  // value={admissionFormData.batch}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none"
                >
                  {/* Options for Batch */}
                  <option value="">Select Batch Name</option>
                  {batches.map((batch) => (
                    <option value={batch.batch_id}>{batch.batch_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="batch"
                  className="block text-sm font-medium text-gray-600"
                >
                  Camp Year
                </label>
                <select
                  id="camp_year"
                  name="camp_year"
                  // value={admissionFormData.batch}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded shadow appearance-none"
                >
                  {/* Options for Batch */}
                  <option value="">Select Camp Year</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              {/* <div>
                <label className="block text-gray-600">Company</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Company"
                  value={body.company}
                  name="company"
                  onChange={handleInputChange}
                />
              </div> */}

              {/* <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <div className="text-center bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600">
                  <button type="button" onClick={handleFilterSubmit}>
                    Filter
                  </button>
                </div>
              </div> */}
              <button
                className="text-sm text-white px-3 py-1 font-semibold bg-indigo-500 h-9 mt-5 rounded-md "
                onClick={downloadExcel}
              >
                Excel download
              </button>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xxl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between">
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                    Filtered Cadets
                  </h2>
                </header>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table
                      className="dark:text-slate-300"
                      style={{ width: "100%" }}
                    >
                      <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                        <tr>
                          <th className="p-2">
                            <div className="font-semibold text-left">Sr.</div>
                          </th>
                          {/* <th className="p-2">
                            <div className="font-semibold text-center">
                              Reg. Id
                            </div>
                          </th> */}
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Name
                            </div>
                          </th>

                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Camp Name
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Batch Name
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Contact
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Pick-up City
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Pick-up Point
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div
                                className="text-left"
                                style={{ fontWeight: "bold" }}
                              >
                                {index + 1}
                              </div>
                            </td>
                            {/* <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.sid}
                                </div>
                              </div>
                            </td> */}
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.first_name} {item.last_name}
                                </div>
                              </div>
                            </td>

                            <td
                              className="p-2"
                              onClick={() => handleClick(item.camp_id)}
                            >
                              <div className="text-center">{`${getCampName(
                                item.camp_id
                              )}`}</div>
                              {/* <div className="text-center">{item.camp_id}</div> */}
                            </td>
                            <td
                              className="p-2"
                              onClick={() => handleClick1(item.batch_id)}
                            >
                              <div className="text-center">{`${getBatchName(
                                item.batch_id
                              )}`}</div>
                              {/* <div className="text-center">{item.camp_id}</div> */}
                            </td>
                            <td className="p-2">
                              <div className={`text-center`}>{item.phn}</div>
                            </td>
                            <td className="p-2">
                              <div className={`text-center`}>
                                {item.pick_up_city}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className={`text-center`}>
                                {item.pick_up_point}
                              </div>
                              {/* <div className="text-center grid grid-cols-2 grid-rows-1 gap-1"> */}
                              {/* <Link
                                  to={`/update-student-details?id=${item.sid}`}
                                  className="text-sm text-white py-1 px-1 bg-blue-500"
                                  // style={{ padding: "1px", fontSize: "13px", width: "100px", height: "30px" }}//
                                >
                                  <button
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      padding: "1px",
                                    }}
                                  >
                                    View & Edit
                                  </button>
                                </Link> */}
                              {/* //add entrance card, report card, escort card, receipt on filter students // */}
                              {/* <Link
  className="text-sm text-white py-1 px-2 bg-yellow-500"
>
  <button
    style={{
      width: "100%",
      height: "100%",
      padding: "1px",
    }}
    onClick={() => handleShow(item.sid)}
  >
    More
  </button>
</Link>

<BasicModal1 modalOpen={modalOpen[item.sid]} handleClose={() => handleClose(item.sid)} sid={activeSid} /> */}

                              {/* {showDropdown && (
                                  <div className="absolute z-10 right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                                    <button
                                      onClick={() =>
                                        handleOptionClick("escort card")
                                      }
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                                    >
                                      Escort Card
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleOptionClick("entrance card")
                                      }
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                                    >
                                      Entrance Card
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleOptionClick("report card")
                                      }
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                                    >
                                      Report Card
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleOptionClick("receipt")
                                      }
                                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                                    >
                                      Receipt
                                    </button>
                                  </div>
                                )} */}
                              {/* </div> */}
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

export default Filter;
