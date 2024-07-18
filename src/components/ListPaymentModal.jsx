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

export default function ListPayments({ sid, send }) {
  async function fetchPayment() {
    const res = await axios.get(
      `https://${baseurl}/getStudentPayment?sid=${sid}`
    );
    if (res.data.success) {
      setPaymentData(res.data.payments);
      console.log(res.data.payments);
    }
  }

  const [paymentData, setPaymentData] = useState([]);
  let [deleted, setDeleted] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    fetchPayment();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchPayment();
  }, [deleted]);

  return (
    <div className="flex items-center justify-center">
      <button
        className="text-sm text-white px-2 py-1 bg-orange-500 w-full h-full"
        // style={{ padding: "2px", fontSize: "13px" }}
        onClick={handleOpen}
      >
        View Payments
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-black">
          <div className="border-2 border-black rounded-sm h-10  grid-cols-5 mt-3 flex justify-between items-center px-2 font-bold text-sm space-x-8 ">
            <p>Amount</p>
            <p>Mode</p>
            <p>Option</p>
            <p>Date</p>
            <p>Download</p>
            <div
              className={
                send ? `flex space-x-2` : "flex items-center justify-center"
              }
            >
              <p>{send ? "Send via " : "Delete"}</p>
            </div>
          </div>
          {paymentData.map((payment) => (
            <div
              className={`border border-black rounded-sm ${
                send ? "h-24" : "h-10"
              } mt-3 grid-cols-5 flex justify-between space-x-6 items-center px-2 text-sm `}
            >
              <p>₹ {payment.payment_amount}</p>
              <p>{payment.payment_mode}</p>
              <p>{payment.payment_option}</p>
              <p>{payment.payment_date}</p>
              <a target="_blank" href={payment.receipt_url}>
                Download
              </a>
              {!send ? (
                <button
                  className="text-sm text-red-500"
                  onClick={async (e) => {
                    if(confirm("Do you Really want to Delete This Payment ?")){
                    const res = await axios.delete(
                      `https://${baseurl}/deletePayment?payment_id=${payment.payment_id}&payment_amount=${payment.payment_amount}&sid=${payment.sid}`
                    );
                    setDeleted(deleted + 1);
                    }
                  }}
                >
                  Delete
                </button>
              ) : (
                <div className="flex flex-col space-x-4 py-4 space-y-2">
                  <button
                    className="text-sm bg-green-500 px-1"
                    onClick={async (e) => {
                      const res = await axios.get(
                        `https://${baseurl}/sendReceipt_wp?payment_id=${payment.payment_id}&sid=${payment.sid}`
                      );
                      toast("Sent successfully...");
                    }}
                  >
                    Whatsapp
                  </button>
                  <button
                    className="text-sm bg-yellow-500"
                    onClick={async (e) => {
                      const res = await axios.get(
                        `https://${baseurl}/sendReceipt_email?payment_id=${payment.payment_id}&sid=${payment.sid}`
                      );
                      toast("Sent successfully...");
                    }}
                  >
                    Email
                  </button>
                  <button
                    className="text-sm bg-blue-500"
                    onClick={async (e) => {
                      const res = await axios.get(
                        `https://${baseurl}/sendReceipt_sms?payment_id=${payment.payment_id}&sid=${payment.sid}`
                      );
                      toast("Sent successfully...");
                    }}
                  >
                    SMS
                  </button>
                </div>
              )}
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
