import React from "react";
import { Link } from "react-router-dom";

const Payment = ({ nextStep, prevStep }) => {
  return (
    <div>
      {/* Payment Form */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header
              className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Complete your Payment
              </h2>
            </header>
            <div className="p-4">
              <div className="overflow-x-auto">
                <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold mb-4">
                    Payment Details
                  </h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Total Fee
                    </label>
                    <p className="text-lg font-semibold text-blue-600">
                      ₹10,000
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Choose Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="radio"
                          id="upi"
                          name="paymentMethod"
                          value="upi"
                        />
                        <label htmlFor="upi"> UPI</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="cheque"
                          name="paymentMethod"
                          value="cheque"
                        />
                        <label htmlFor="cheque"> Cheque</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="cash"
                          name="paymentMethod"
                          value="cash"
                        />
                        <label htmlFor="cash"> Cash</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="emi"
                          name="paymentMethod"
                          value="emi"
                        />
                        <label htmlFor="emi"> EMI</label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Payment Amount
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded shadow appearance-none"
                      placeholder="Enter the payment amount"
                    />
                  </div>
                  <Link
                    to={"https://rzp.io/i/seZOp9F"}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Make Payment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around ">
        <button
          onClick={prevStep}
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
          onClick={nextStep}
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
    </div>
  );
};

export default Payment;
