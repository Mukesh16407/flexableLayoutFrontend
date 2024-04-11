import { useState, useEffect } from "react";
// import { ResizableBox } from "react-resizable";
// import "react-resizable/css/styles.css";
import { Resizable } from "re-resizable";
import { ModalComponent } from "./ModalComponent";
import { Box } from "@mui/material";

import axios from "axios";
import { BASE_URL } from "../services/helper";
import { ComponentLayout } from "./ComponentLayout";
import { ThirdComponentLayout } from "./ThirdComponentLayout";
import { Header } from "./Header";

const ResizableLayout = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditClick, setIsEditClick] = useState(false);
  const [editId, setEditId] = useState("");
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState([]);
  const [content, setContent] = useState({
    heading: "",
    textBody: "",
    componentId: null,
  });

  const [apiCount, setApiCount] = useState({
    addCount: 0,
    updateCount: 0,
  });

  const [filterComponentData, setFilterComponentData] = useState({
    component1: [],
    component2: [],
    component3: [],
  });

  const getData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/components`);
      setContents(response.data.data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const countApiCall = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/components/count`);

      console.log(response?.data, "response");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    countApiCall();
  }, [apiCount]);

  useEffect(() => {
    getData();
  }, [isEditClick, modalIsOpen]);

  useEffect(() => {
    if (contents.length > 0) {
      const component1Data = contents.filter(
        (item) => item.componentId === "1"
      );
      const component2Data = contents.filter(
        (item) => item.componentId === "2"
      );
      const component3Data = contents.filter(
        (item) => item.componentId === "3"
      );

      setFilterComponentData({
        ...filterComponentData,
        component1: component1Data,
        component2: component2Data,
        component3: component3Data,
      });
    }
  }, [contents]);

  const handleAdd = (value) => {
    setModalIsOpen(true);
    setIsEditClick(false);
    setContent({
      heading: "",
      textBody: "",
      componentId: value,
    });

    // setContent({ ...content, componentId: value });
  };

  const handleEdit = async (data, compId) => {
    setModalIsOpen(true);
    setContent({
      heading: data.title,
      textBody: data?.description,
      componentId: compId,
    });
    setEditId(data?._id);

    setIsEditClick(true);
  };

  const handleEditUpdate = async (id) => {
    await axios.put(`${BASE_URL}/api/components/${id}`, {
      componentId: content.componentId,
      title: content?.heading,
      description: content?.textBody,
    });
    setModalIsOpen(false);
    setIsEditClick(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/components/${id}`);
    getData();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          maxHeight: "100vh",
        }}
      >
        <Box>
          <Header />
        </Box>
        <Box sx={{ marginTop: "2%" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {[0, 1].map((index) => (
              <Resizable
                key={index}
                defaultSize={{ width: "50%", padding: "10px", height: "100%" }}
                style={{ border: "1px solid black" }}
                minWidth={"30%"}
              >
                <ComponentLayout
                  filterComponentData={filterComponentData}
                  handleAdd={handleAdd}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  index={index}
                  loading={loading}
                />
              </Resizable>
            ))}
          </Box>

          <Resizable
            defaultSize={{ width: "100%", padding: "10px", height: "auto" }}
            style={{ border: "1px solid black" }}
            minWidth={"30%"}
            minHeight={"30%"}
          >
            <ThirdComponentLayout
              filterComponentData={filterComponentData}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              loading={loading}
            />
          </Resizable>
        </Box>
      </Box>
      {modalIsOpen && (
        <ModalComponent
          setModalIsOpen={setModalIsOpen}
          content={content}
          setContent={setContent}
          isEditClick={isEditClick}
          handleEditUpdate={handleEditUpdate}
          editId={editId}
        />
      )}
    </>
  );
};

export default ResizableLayout;
