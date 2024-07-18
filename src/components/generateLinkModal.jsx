import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../utils/domain";
import { toast } from "sonner";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function GenerateLinkModal({ sid }) {
  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    setOpen(true);
  };
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);

  const [fields, setFields] = useState({
    Payment_amount: "",
    Payment_option: "",
  });

  const paymentModes = [
    "Cash",
    "Cheque",
    "IMPS",
    "RTGS",
    "NEFT",
    "Credit Card",
    "Debit Card",
    "PayPal",
    "Bank Transfer",
    "GPay",
    "PhonePay",
    "Paytm",
  ];

  return (
    <div className="w-full">
      <button
        className="text-sm text-white px-3 py-1 font-semibold bg-green-500"
        style={{
          fontSize: "13px",
          width: "100%",
          height: "auto",
        }}
        onClick={handleOpen}
      >
        Generate Link
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-black">
          <div className="flex flex-col mb-3">
            <label className="text-sm font-semibold">Payment Amount</label>
            <input
              type="text"
              value={fields.Payment_amount}
              placeholder="Enter value"
              onChange={(e) =>
                setFields({ ...fields, Payment_amount: e.target.value })
              }
              className="p-1 border border-gray-300 rounded-md"
            />
            <label className="text-sm font-semibold">Payment Option</label>
            <select
              value={fields.Payment_option}
              onChange={(e) =>
                setFields({ ...fields, Payment_option: e.target.value })
              }
              className="p-1 border border-gray-300 rounded-md"
            >
              <option value="">Select Payment Options </option>
              <option value="totalPayment">Total Payment</option>
              <option value="1installment">1st Installment </option>
              <option value="2installment">2nd Installments </option>
              <option value="booking">Booking</option>
            </select>
          </div>

          <button
            className="px-2 bg-green-500 mt-2 w-min rounded-md"
            onClick={async () => {
              setLoading(true);
              try {
                const response = await axios.get(
                  `https://${baseurl}/createNewPaymentUrl?sid=${sid}&payment_amt=${fields.Payment_amount}&payment_option=${fields.Payment_option}`
                );
                setOpen(false);
                // Show a success message
                toast("Generated Succesfully");
                setLoading(false);
              } catch (error) {
                setOpen(false);
                // Show an error message
                console.log(error);
                alert("Try Again...");
                setLoading(false);
              }
            }}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </Box>
      </Modal>
    </div>
  );
}
