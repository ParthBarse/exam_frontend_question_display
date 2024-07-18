import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import axios from "axios";
import { baseurl } from "../utils/domain";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  margin: "auto",
};

export default function BasicModal({ modalOpen, sid, fetchData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reason, setReason] = React.useState("");

  const handleChangeStatus = async (status) => {
    const res = await axios({
      method: "put",
      url: `https://${baseurl}/changeStatus`,
      data: {
        sid,
        new_status: status,
        reason: reason,
      },
    });
    fetchData();
    handleClose();
    setReason("");
  };

  useEffect(() => {
    console.log(sid);
    setOpen(modalOpen);
  }, [modalOpen]);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
        <Box sx={style} className="flex flex-col gap-3">
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter a reason"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <button
              style={{ fontSize: "15px", height: "50%" }}
              className="border border-solid p-2 px-4 bg-red-500 text-white min-w-[130px]"
              onClick={() => handleChangeStatus("Cancel")}
            >
              Cancel
            </button>
            <button
              style={{ fontSize: "15px", height: "50%" }}
              className="border border-solid p-2 px-4 bg-yellow-400 text-white min-w-[130px]"
              onClick={() => handleChangeStatus("Refund")}
            >
              Refunded
            </button>
            <button
              style={{ fontSize: "15px", height: "50%" }}
              className="border border-solid p-2 px-4 bg-blue-500 text-white min-w-[130px]"
              onClick={() => handleChangeStatus("Extend")}
            >
              Extended
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
