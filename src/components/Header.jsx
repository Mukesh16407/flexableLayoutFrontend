import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
export const Header = ({ apiCount }) => {
  console.log(apiCount, "apiCount");
  return (
    <AppBar position="static" sx={{ backgroundColor: "#135D66" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6" component="div">
          Add API Count:{apiCount?.addCount}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6" component="div">
          Update API Count:{apiCount?.updateCount}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  apiCount: PropTypes.object.isRequired,
};
