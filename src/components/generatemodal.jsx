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

export default function GenerateModal({ sid }) {
  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    setOpen(true);
  };
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);

  const [fields, setFields] = useState({
    cqy: "",
  });

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
        Generate
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-black">
          {Object.keys(fields).map((key) => (
            <div className="flex flex-col mb-3">
              <label className="text-sm font-semibold">
                {key.toUpperCase()}
              </label>
              <input
                type="text"
                value={fields[key]}
                placeholder="Enter value"
                onChange={(e) =>
                  setFields({ ...fields, [key]: e.target.value })
                }
                className="p-1 border border-gray-300 rounded-md"
              />
              <button
                className="px-2 bg-green-500 mt-2 w-min rounded-md"
                onClick={async () => {
                  setLoading(true);
                  try {
                    const response = await axios.get(
                      `https://${baseurl}/generateCampCertificate?sid=${sid}&cqy=${fields.cqy}`
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
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
