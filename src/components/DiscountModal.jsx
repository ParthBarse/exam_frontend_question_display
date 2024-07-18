import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast } from "sonner";
import { baseurl } from "../utils/domain";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 6,
};

export default function DiscountModal({
  sid,
  payable,
  batch_id,
  discount_amount,
  camp_id,
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedMode, setSelectedMode] = useState("");

  const handleReset = async (e) => {
    await axios.get(
      `https://${baseurl}/resetDiscount?sid=${sid}&camp_id=${camp_id}`
    );
    navigate(0);
    handleClose();
  };

  const [discountAmount, setDiscountAmount] = useState(0);

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("sid", sid);
    formData.append("total_amount_payable", payable - discountAmount);
    formData.append("discount_amount", discountAmount);
    formData.append("batch_id", batch_id);
    setLoading(true);
    try {
      await axios.put(`https://${baseurl}/updateStudent`, formData);
      toast("Discount set successfully", { color: "green" });
      navigate(0);
    } catch (err) {
      toast.error("Error setting discount");
    }
    setLoading(false);
    handleClose();
    setDiscountAmount(0);
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        className="text-sm text-white px-2 bg-indigo-500"
        style={{ padding: "1px", fontSize: "13px", color: "white" }}
        onClick={handleOpen}
      >
        Set Discount
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="rounded-md text-sm font-medium text-gray-600"
        >
          <label about="discount_amount">Discount Amount</label>
          <input
            className="w-full mb-2"
            type="number"
            name="discount_amount"
            id="discount_amount"
            placeholder="Enter discount amount"
            value={discountAmount}
            onChange={(e) => {
              setDiscountAmount(e.target.value);
            }}
          />
          <br />
          <label about="total_amount_payable">Total Payable</label>
          <br />
          <input
            className="w-full"
            type="number"
            name="total_amount_payable"
            id="total_amount_payable"
            value={payable - discountAmount}
            disabled
          />
          <br />
          <div className="flex justify-between">
            <button
              className="text-sm text-white  bg-orange-500 mt-3"
              style={{
                padding: "4px",
                fontSize: "13px",
                width: "auto",
                height: "auto",
              }}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="text-sm text-white  bg-red-500 mt-3"
              style={{
                padding: "4px",
                fontSize: "13px",
                width: "auto",
                height: "auto",
              }}
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="text-sm text-white  bg-green-500 mt-3"
              style={{
                padding: "4px",
                fontSize: "13px",
                width: "auto",
                height: "auto",
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
