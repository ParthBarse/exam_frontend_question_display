import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../utils/domain";

function Settings() {
  const [formData, setFormData] = useState({
    MerchantKey: "", // Matched state key with input name
    SALT: "", // Matched state key with input name
    ENV: "", // Matched state key with input name
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form validation or submit data to an API here.

    // For this example, let's simulate a successful submission.
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      {submitted && (
        <div className="bg-green-200 text-xl text-green-700 p-8 rounded-lg mb-8">
          Settings Updated Successfully!
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Merchant Key</label>
          <input
            type="text"
            name="MerchantKey"
            value={formData.MerchantKey}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">SALT</label>
          <input
            type="text"
            name="SALT"
            value={formData.SALT}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">ENV</label>
          <input
            type="text"
            name="ENV"
            value={formData.ENV}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
