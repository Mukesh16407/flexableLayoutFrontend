import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import styled from "@emotion/styled";

export const style = {
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

export const Textarea = styled(BaseTextareaAutosize)(
  () => `
    box-sizing: border-box;
    width: 400px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    
  `
);
