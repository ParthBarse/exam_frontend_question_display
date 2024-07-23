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
      navigate("/login");
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
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <h1 className="text-lg text-red-500 text-bold">Under Maintenance</h1>
          <p>We are currently performing maintenance. Please check back later.</p>
        </div>
        </main>
      </div>
    </div>
  );
}
