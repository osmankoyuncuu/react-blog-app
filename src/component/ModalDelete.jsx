import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { deleteBlog } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalDelete = ({ open, setOpen, id }) => {
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description">
            Are you sure you want to delete the blog?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 1,
              gap: "1rem",
            }}
          >
            <Button variant="contained" onClick={() => setOpen(!open)}>
              No
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                deleteBlog(id);
                setOpen(!open);
                navigate("/");
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDelete;
