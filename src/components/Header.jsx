import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#135D66" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6" component="div">
          APIAdd:0
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6" component="div">
          API Update:0
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};
