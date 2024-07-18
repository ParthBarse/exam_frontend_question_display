import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { baseurl } from "../utils/domain";

function EditFeeDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    camp_name: "",
    camp_fee: "",
    // chess_prefix: "",
    camp_place: "",
    camp_description: "",
    fee_discount: "",
    // discount_date: "",
    final_fee: "",
    camp_status: false,
  });
  const [campName, setCampName] = useState("");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const campId = queryParams.get("id");

    // Fetch initial data for the form based on the camp ID
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${baseurl}/getCamp?camp_id=${campId}`
        );
        if (response.ok) {
          const campDetails = await response.json();

          // Ensure that the response structure matches your expectations
          setFormData({
            camp_name: campDetails.camp.camp_name,
            camp_fee: campDetails.camp.camp_fee,
            // chess_prefix: campDetails.camp.chess_prefix,
            camp_place: campDetails.camp.camp_place,
            camp_description: campDetails.camp.camp_description,
            fee_discount: campDetails.camp.fee_discount,
            // discount_date: campDetails.camp.discount_date,
            final_fee: campDetails.camp.final_fee,
            camp_status: campDetails.camp.camp_status || false,
            camp_id: campDetails.camp.camp_id,
          });

          // setCampName(campDetails.camp_name);
        } else {
          console.error("Failed to fetch camp details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [location.search]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      camp_status: prevFormData.camp_status === "Active" ? false : "Active",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert date to yyyy-mm-dd format
    // const formattedDiscountDate = convertDate(formData.discount_date);

    try {
      const formDataToSend = new FormData(e.target);

      // for (const key in formData) {
      //   formDataToSend.append(key, key === 'discount_date' ? formattedDiscountDate : formData[key]);
      // }
      formDataToSend.append("camp_id", formData.camp_id);

      const response = await fetch(`https://${baseurl}/updateCamp`, {
        method: "PUT",

        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Camp details updated successfully!");
        alert("Camp details Updated successfully!");
        window.location.href = "/camp";
        // Optionally, you can redirect the user to another page or perform other actions
      } else {
        console.error("Failed to update camp details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const convertDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-screen-xl mx-auto">
            <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header
                className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Update Camp
                </h2>
                <Link
                  end
                  to="/camp"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Back to camp list
                </Link>
              </header>
              <div className="p-3 shadow-lg border border-gray-300 rounded-lg">
                <form className="space-y-2" onSubmit={handleSubmit}>
                  <label className="text-lg font-semibold">Camp Name</label>
                  <input
                    type="text"
                    name="camp_name"
                    placeholder="Enter Name"
                    value={formData.camp_name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  />
                  {/* <label className="text-lg font-semibold">Chess Prefix</label>
                  <input
                    type="text"
                    name="chess_prefix"
                    value={formData.chess_prefix}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  /> */}

                  <label className="text-lg font-semibold">Camp Place</label>
                  <input
                    type="text"
                    name="camp_place"
                    value={formData.camp_place}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  />
                  <label className="text-lg font-semibold">Camp Fee</label>
                  <input
                    type="number"
                    name="camp_fee"
                    placeholder="Enter Fee"
                    value={formData.camp_fee}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  />

                  <label className="text-lg font-semibold">
                    Camp Description
                  </label>
                  <input
                    type="text"
                    name="camp_description"
                    value={formData.camp_description}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  />

                  <label className="text-lg font-semibold">Fee Discount</label>
                  <input
                    type="text"
                    name="fee_discount"
                    value={formData.fee_discount}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  />
                  {/* console.log({formData.discount_date}) */}

                  {/* <label className="text-lg font-semibold">Discount Date</label>
                  <input
                    type="date"
                    name="discount_date"
                    value={convertDate(formData.discount_date)}       
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  /> */}
                  <label className="text-lg font-semibold">Final Fee</label>
                  <input
                    type="text"
                    name="final_fee"
                    value={formData.final_fee}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg text-gray-800 focus:ring focus:ring-blue-400"
                  />

                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      name="camp_status"
                      checked={formData.camp_status === "Active"}
                      onChange={handleCheckboxChange}
                      className="text-blue-500 focus:ring focus:ring-blue-400"
                    />
                    <label className="text-lg">Is Active</label>
                  </div>

                  <button
                    type="submit"
                    className="w-32 p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditFeeDetails;
