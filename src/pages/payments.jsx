import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useNavigate } from "react-router-dom";
import BasicModal from "../components/Modal";
import PaymentModal from "../components/PaymentModal";
import ListPayments from "../components/ListPaymentModal";
import { baseurl } from "../utils/domain";
import GenerateLinkModal from "../components/generateLinkModal";
import ListPaymentsLinks from "../components/ListpaymentLinks";

export default function Payments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [data, setData] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [camps, setCamps] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [SID, setSID] = useState(null);
  const [nameFilter, setNameFilter] = useState("");
  const [regId, setRegId] = useState("");

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
    camp_id: "",
    batch_id: "",
  });

  useEffect(() => {
    console.log(body);
  }, [body]);

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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    async function getAllCamps() {
      const res = await axios.get(`https://${baseurl}/getAllCamps`);
      const camps = res.data.camps;
      // console.log('camps' + camps);
      setCamps(camps);
    }
    getAllCamps();
  }, []);

  function getCampId(campName) {
    const camp = camps.find((camp) => camp.camp_name === campName);
    console.log(camp);
    return camp.camp_id;
  }

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

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden box-content">
      <BasicModal modalOpen={modalOpen} sid={SID} fetchData={fetchData} />
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="flex justify-center">
            <div className="grid grid-cols-4 px-9 gap-4">
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
                <label className="block text-gray-600">Pick-up City</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Pick-up City"
                  value={body.pick_up_city}
                  name="pick_up_city"
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

              <div
                style={{ display: "flex", flexDirection: "column-reverse" }}
              ></div>
            </div>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                      Students
                    </h2>
                  </div>
                </header>
                <div className="p-4">
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table
                      className="dark:text-slate-300"
                      style={{ width: "100%" }}
                    >
                      {/* Table header */}
                      <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                        <tr>
                          <th className="p-2">
                            <div className="font-semibold text-left">Sr.</div>
                          </th>
                          <th className="p-2 max-w-xs">
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
                              paid/payable
                            </div>
                          </th>

                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Action
                            </div>
                          </th>
                        </tr>
                      </thead>
                      {/* Table body */}
                      <tbody className="text-sm text-center font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        {data.map((item, index) => (
                          <tr key={item.sid}>
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
                                  {item.first_name + " " + item.last_name}
                                </div>
                              </div>
                            </td>

                            <td className="p-4">
                              {item.total_amount_paid}/
                              {item.total_amount_payable}
                            </td>

                            <td className="p-4">
                              <div className="text-center grid grid-cols-2 grid-rows- gap-2 h-full">
                                {/* <Link
                                   to={`/update-student-details?id=${item.sid}`}
                                  className="text-sm text-white px-2 bg-yellow-500"
                                  style={{ padding: "1px", fontSize: "13px" }}
                                >
                                  Vuew Form
                                </Link> */}
                                <PaymentModal sid={item.sid} />

                                <ListPayments sid={item.sid} send={false} />

                                <GenerateLinkModal sid={item.sid} />

                                <ListPaymentsLinks sid={item.sid} />

                                {/* <button
                                  className="text-sm text-white px-2 bg-indigo-500"
                                  style={{ padding: "1px", fontSize: "13px" }}
                                  onClick={() => alert(`Reason : ${item.reason}`)}
                                >
                                  Reason
                                </button> */}
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
            {/* Previous and Next Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button
                style={{
                  padding: "5px 10px",
                  background: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "10px",
                  cursor: currentPage > 1 ? "pointer" : "not-allowed",
                }}
                onClick={() => {
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
              >
                &lt;
              </button>
              <button
                style={{
                  padding: "5px 10px",
                  background: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: currentPage < totalPages ? "pointer" : "not-allowed",
                }}
                onClick={() => {
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
