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

export default function ListPaymentsLinks({ sid, send }) {
  async function fetchPaymentLinks() {
    const res = await axios.get(
      `https://${baseurl}/getStudentsPaymentUrlDetails?sid=${sid}`
    );
    if (res.data.success) {
      setPaymentLinks(res.data.all_links);
      console.log(res.data.all_links);
    }
  }

  const [paymentLinks, setPaymentLinks] = useState([]);
  let [deleted, setDeleted] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    fetchPaymentLinks();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchPaymentLinks();
  }, [deleted]);

  return (
    <div className="w-full">
      <button
        className="text-sm text-white px-3 py-1 font-semibold bg-indigo-500"
        style={{
          fontSize: "13px",
          width: "100%",
          height: "auto",
        }}
        onClick={handleOpen}
      >
        View Links
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-black">
          <table className="w-full border-spacing-8">
            <thead>
              <tr>
                <th>Sr. no</th>
                <th className="w-2/12">Payment URL</th>
                <th className="w-3/12">Amount</th>
                <th className="w-3/12">Transaction Id</th>
                <th className="w-4/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentLinks.map((link, index) => (
                <tr key={index} className="space-x-3">
                  <td>{index + 1}</td>
                  <td className="max-w-sm overflow-auto mr-2 p-4">
                    {link.payment_url}
                  </td>
                  <td className="w-auto px-8">₹{link.amount}</td>
                  <td className="w-auto">{link.merchant_txn}</td>
                  <td className="w-auto ml-3 flex">
                    <button
                      className="px-4 mb-4 bg-blue-500 text-white rounded-md mr-2 mt-6"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(link.payment_url)
                          .then((x) => alert("URL copied to clipboard!"));
                      }}
                    >
                      Copy
                    </button>
                    <button
                      className="px-4 h-min bg-green-500 text-white rounded-md mt-6"
                      onClick={async (e) => {
                        try {
                          const res = await axios.post(
                            `https://${baseurl}/verifyPayment`,
                            link
                          );
                          const data = res.data.msg;
                          alert(data);
                        } catch (err) {
                          alert("Error verifying payment");
                        }
                      }}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
}
