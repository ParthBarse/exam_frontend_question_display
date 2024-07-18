import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { baseurl } from "../utils/domain";

export default function Discount() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [reqData, setReqData] = useState({
    discount_code: "",
    discount_amount: "",
  });
  const [discountData, setDiscountData] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  async function fetchData() {
    const res = await axios.get(`https://${baseurl}/getAllDiscounts`);
    setDiscountData(res.data.discounts);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReqData((reqData) => ({
      ...reqData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://${baseurl}/addDiscountCodes`, reqData)
      .then((e) => fetchData())
      .then((e) => setReqData({ discount_amount: "", discount_code: "" }))
      .then((e) => toast.success("Discount Added Successfully"))
      .catch((e) => console.log(e));
  };

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
            <div>
              {/* Payment Form */}
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <div className="overflow-x-auto">
                      <form className="  w-full rounded px-8 pt-6 pb-8 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Name fields */}
                          <div className="mb-4">
                            <label
                              htmlFor="discount_code"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Discount Code
                            </label>
                            <input
                              id="discount_code"
                              name="discount_code"
                              value={reqData.discount_code}
                              type="text"
                              className="w-full px-3 py-2 border rounded shadow appearance-none"
                              placeholder="Enter code"
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="Discount Amount"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Discount Amount
                            </label>
                            <input
                              id="Discount Amount"
                              name="discount_amount"
                              value={reqData.discount_amount}
                              type="text"
                              className="w-full px-3 py-2 border rounded shadow appearance-none"
                              placeholder="Enter amount"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <button
                          onClick={handleSubmit}
                          className="text-md"
                          style={{
                            padding: "5px 10px",
                            background: "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xxl mx-auto">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                    <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                      <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                        Discount Code
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
                                <div className="font-semibold text-left">
                                  Sr.
                                </div>
                              </th>
                              <th className="p-2">
                                <div className="font-semibold text-center">
                                  Code
                                </div>
                              </th>
                              <th className="p-2">
                                <div className="font-semibold text-center">
                                  Amount
                                </div>
                              </th>
                              <th className="p-2">
                                <div className="font-semibold text-center">
                                  Action
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                            {discountData.map((item, index) => (
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
                                  <div className="text-center">
                                    {item.discount_code}
                                  </div>
                                </td>
                                <td className="p-2">
                                  <div className={`text-center`}>
                                    {item.discount_amount}
                                  </div>
                                </td>
                                <td className="p-2 flex justify-center">
                                  {/* <div className="text-center grid grid-cols-1 grid-rows-1 gap-1"> */}

                                  <button
                                    className="btn-primary bg-red-500 hover:bg-red-600 text-white px-1 "
                                    onClick={(e) => {
                                      if(confirm("Do you Really want to Delete This Discount Code ?")){
                                      axios.delete(
                                          `https://${baseurl}/deleteDiscount?discount_id=${item.discount_id}`
                                        )
                                        .then((e) => fetchData())
                                        .then((e) => {
                                          toast.success(
                                            "Deleted successfully!"
                                          );
                                        })
                                        .catch((e) => console.log(e));
                                    }}}
                                  >
                                    Delete
                                  </button>

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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
