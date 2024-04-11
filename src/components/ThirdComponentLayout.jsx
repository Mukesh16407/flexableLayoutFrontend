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

export const ThirdComponentLayout = (
  filterComponentData,
  handleAdd,
  handleEdit,
  handleDelete,
  loading
) => {
  return (
    <Box>
      <Box>
        <Typography variant="h6" component="h2" sx={{ marginLeft: "50%" }}>
          Component 3
        </Typography>
        <Stack direction="row" spacing={2} sx={{ marginLeft: "50%" }}>
          <Button variant="outlined" onClick={() => handleAdd(3)}>
            ADD
          </Button>
        </Stack>
      </Box>
      <div>
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
              <TableBody>
                {filterComponentData.component3?.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleEdit(data, 3)}
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
      </div>
    </Box>
  );
};

ThirdComponentLayout.propTypes = {
  filterComponentData: PropTypes.object.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
