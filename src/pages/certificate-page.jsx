import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useNavigate } from "react-router-dom";
import BasicModal from "../components/Modal";
import { baseurl } from "../utils/domain";
import { toast } from "sonner";
import GenerateModal from "../components/generatemodal";

function RegStudent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [data, setData] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [camps, setCamps] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [SID, setSID] = useState(null);
  const [sendLoading, setSendLoading] = useState(false);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get(`https://${baseurl}/getAllCamps`);
        setCamps(response.data.camps);
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };

    fetchCamps();
  }, []);

  const getCampName = (campId) => {
    const camp = camps.find((camp) => camp.camp_id === campId);
    return camp ? camp.camp_name : "Camp not assigned";
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, [isDeleted]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://${baseurl}/getAllStudents`);
      setData(response.data.students); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data;

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

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(`https://${baseurl}/getAllBatches`);
        setBatches(response.data.camps);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    fetchBatches();
  }, []);

  const getBatchName = (batchId) => {
    const batch = batches.find((batch) => batch.batch_id === batchId);
    return batch ? batch.batch_name : "Batch not assigned";
  };

  const [body, setBody] = useState({
    sid: "",

    status: "Active",

    camp_name: "",
    batch_name: "",

    camp_id: "",
    batch_id: "",
  });

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

  const fetchSome = async () => {
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
    fetchSome();
  }, [body]);

  function download(url, filename) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch(console.error);
  }

  const bulkGenerate = async (e) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `https://${baseurl}/bulkGenerateCampCertificate`,
        {
          body: data,
          filter: body,
        }
      );
      // download(res.data.msg, res.data.filename);
      toast("Process Started ...");
      setLoading(false);
      // window.open(res.data.msg);
    } catch (error) {
      toast.error("Error Starting");
      setLoading(false);
    }
  };

  const sendAll = async (e) => {
    setSendLoading(true);
    const res = await axios.post(`https://${baseurl}/sendAllStudentsCert`, {
      body: data,
      filter: body,
    });
    setSendLoading(false);
    toast("Sent successfully!!");
  };

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
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="flex justify-between w-full">
                      <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                        Generate Certificates
                      </h2>
                      <div className="space-x-2">
                        <button
                          className="text-sm text-white px-3 py-1 font-semibold bg-indigo-500"
                          style={{
                            fontSize: "13px",

                            height: "auto",
                          }}
                          onClick={bulkGenerate}
                          disabled={loading}
                        >
                          {loading ? "Generating..." : "Bulk Generate"}
                        </button>
                        <button
                          className="text-sm text-white px-3 py-1 font-semibold bg-indigo-500"
                          style={{
                            fontSize: "13px",

                            height: "auto",
                          }}
                          onClick={sendAll}
                        >
                          {sendLoading ? "Sending..." : "Send All"}
                        </button>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}></div>
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
                              Camp
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Batch
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Status
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
                      <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        {itemsToDisplay
                          .filter((item) => item.status === "Active")
                          .map((item, index) => (
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
                              <td className="p-2">
                                <div className="text-center">
                                  {getCampName(item.camp_id)}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {getBatchName(item.batch_id)}
                                </div>
                              </td>
                              <td className="p-2">
                                <div
                                  className={`text-center ${
                                    item.status === "inactive"
                                      ? "text-red-500"
                                      : "text-emerald-500"
                                  }`}
                                >
                                  {item.status}
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="text-center grid grid-cols-2 grid-rows-1 gap-2 h-full">
                                  <GenerateModal sid={item.sid} />

                                  <Link className="text-sm text-white py-1 px-1 bg-yellow-500">
                                    <button
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        padding: "1px",
                                      }}
                                      onClick={async () => {
                                        try {
                                          const response = await axios.get(
                                            `https://${baseurl}/sendCampCertificate?sid=${item.sid}`
                                          );
                                          console.log(response.data);
                                          // Show a success message
                                          toast(
                                            "Certificate sent successfully!"
                                          );
                                        } catch (error) {
                                          console.error(error);
                                          // Show an error message
                                          alert(
                                            "Failed to send Certificate. Please try again."
                                          );
                                        }
                                      }}
                                    >
                                      Send
                                    </button>
                                  </Link>
                                </div>
                                <div className="text-center grid grid-cols-1 grid-rows-1 gap-2 mt-2 h-full">
                                  <a
                                    target="_blank"
                                    href={`${item.completion_cert}`}
                                    className="text-sm text-white px-2 bg-indigo-500"
                                  >
                                    <button className="text-sm text-white px-2 bg-indigo-500">
                                      View & Download
                                    </button>
                                  </a>
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

export default RegStudent;
