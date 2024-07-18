import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useNavigate } from "react-router-dom";
import BasicModal1 from "../components/Modal1";
import { toast } from "sonner";
import { baseurl } from "../utils/domain";
function Filter() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [regId, setRegId] = useState("");

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
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

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
      .get(`https://${baseurl}/filterbyRegID/${regId}`)
      .then((x) => setData(x.data));
  }, [regId]);

  const handleFilterSubmit = () => {
    fetchData();
  };

  const [batches, setBatches] = useState([]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === "camp_id") {
      const res = await axios.get(
        `https://${baseurl}/getBatches?camp_id=${value}`
      );
      const batches = res.data.batches;
      setBatches(batches);
    }
    setBody({ ...body, [name]: value });
  };

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

  const [loadingSms, setLoadingSms] = useState(false);

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
            <div className="grid grid-cols-4 px-9 grid-rows-2 gap-4">
              <div>
                <label className="block text-gray-600">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="First name"
                  value={body.first_name}
                  name="first_name"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-600">Middle Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Middle Name"
                  value={body.middle_name}
                  name="middle_name"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-600">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Last Name"
                  value={body.last_name}
                  name="last_name"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-600">Reg Id</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Student Id"
                  value={body.sid}
                  name="sid"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-600">E-mail</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  placeholder="email"
                  value={body.email}
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-gray-600">City</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="City"
                  value={body.city}
                  name="city"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-gray-600">Status</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Status"
                  value={body.status}
                  name="status"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-gray-600">Phone</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Phone"
                  value={body.phn}
                  name="phn"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label
                  htmlFor="camp_category"
                  className="block text-lg font-medium text-gray-600"
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
                <label className="block text-gray-600">Company</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Company"
                  value={body.company}
                  name="company"
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <div className="text-center bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600">
                  <button type="button" onClick={handleFilterSubmit}>
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xxl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
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
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Reg. Id
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Name
                            </div>
                          </th>

                          <th className="p-2">
                            <div className="font-semibold text-center">
                              E-mail
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Contact
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              City
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Medical Certificate
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
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.sid}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.first_name} {item.last_name}
                                </div>
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="text-center">{item.email}</div>
                            </td>
                            <td className="p-2">
                              <div className={`text-center`}>{item.phn}</div>
                            </td>
                            <td className="p-2">
                              <div className={`text-center`}>{item.state}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-center grid grid-cols-2 grid-rows-2 gap-1">
                                <Link
                                  to={`${item.visiting_card}`}
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
                                    Visiting Card
                                  </button>
                                </Link>
                                <Link
                                  // to={`${item.entrence_card}`}
                                  className="text-sm text-white py-1 px-1 bg-yellow-500"
                                  // style={{ padding: "1px", fontSize: "13px", width: "100px", height: "30px" }}//
                                >
                                  <button
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      padding: "1px",
                                    }}
                                    onClick={async () => {
                                      try {
                                        const response = await axios.get(
                                          `https://${baseurl}/sendVisitingCard?sid=${item.sid}`
                                        );
                                        console.log(response.data);
                                        // Show a success message
                                        toast(
                                          "Visiting card sent successfully!"
                                        );
                                      } catch (error) {
                                        console.error(error);
                                        // Show an error message
                                        alert(
                                          "Failed to send Visiting card. Please try again."
                                        );
                                      }
                                    }}
                                  >
                                    Send via Email
                                  </button>
                                </Link>
                                <button
                                  className={`text-sm text-white py-1 px-1 bg-green-500`}
                                  onClick={async (e) => {
                                    setLoadingSms(true);
                                    const res = await axios.get(
                                      `https://${baseurl}/sendVisitingCard_sms?sid=${item.sid}`
                                    );
                                    toast("Visiting Card sent...");
                                    setLoadingSms(false);
                                  }}
                                  disabled={loadingSms}
                                >
                                  Send via SMS
                                </button>
                                <button
                                  className={`text-sm text-white py-1 px-1 bg-rose-500`}
                                  onClick={async (e) => {
                                    const res = await axios.get(
                                      `https://${baseurl}/sendVisitingCard_wp?sid=${item.sid}`
                                    );
                                    toast("Visiting Card sent...");
                                  }}
                                >
                                  Send via Whatsapp
                                </button>
                              </div>
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
