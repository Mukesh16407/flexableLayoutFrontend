import PropTypes from "prop-types";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Loader from "./Loader";

export const ComponentLayout = ({
  filterComponentData,
  handleAdd,
  handleEdit,
  handleDelete,
  index,
  loading,
}) => {
  return (
    <Box sx={{ minHeight: "100%" }}>
      <Box>
        <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
          Component {index + 1}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button variant="outlined" onClick={() => handleAdd(index + 1)}>
            ADD
          </Button>
        </Stack>
      </Box>
      <Box>
        {loading && <Loader />}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Todo</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ overflow: "hidden" }}>
              {filterComponentData[`component${index + 1}`]?.map((data) => (
                <TableRow key={data._id}>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(data, index + 1)}
                      style={{ marginRight: "5px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(data._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

ComponentLayout.propTypes = {
  filterComponentData: PropTypes.object.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
