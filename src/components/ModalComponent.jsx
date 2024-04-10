/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import axios from "axios";
import { Textarea, style } from "./utils";
import { BASE_URL } from "../services/helper";

// eslint-disable-next-line react/prop-types
export const ModalComponent = ({
  setModalIsOpen,
  content,
  setContent,
  isEditClick,
  handleEditUpdate,
  editId,
}) => {
  const handleClose = () => setModalIsOpen(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setContent({ ...content, [name]: value });
  };

  const handleOnClick = async () => {
    await axios.post(`${BASE_URL}/api/components`, {
      componentId: content.componentId,
      title: content?.heading,
      description: content?.textBody,
    });

    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TextField
            fullWidth
            label="Heading"
            name="heading"
            value={content?.heading}
            id="fullWidth"
            onChange={handleOnChange}
          />
          <br />
          <br />
          <br />

          <Textarea
            placeholder="Text Area"
            name="textBody"
            value={content.textBody}
            minRows={6}
            onChange={handleOnChange}
          />
          <Button
            sx={{
              backgroundColor: "black",
              color: "white",
              marginLeft: "85%",
              marginTop: "5px",
              "&:hover": {
                backgroundColor: "gray",
              },
            }}
            onClick={() => {
              isEditClick ? handleEditUpdate(editId) : handleOnClick();
            }}
          >
            {isEditClick ? "Update" : "Save"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
