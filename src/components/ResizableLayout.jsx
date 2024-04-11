/* eslint-disable react-hooks/exhaustive-deps */
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

  console.log(apiCount, "apiCount");

  const [filterComponentData, setFilterComponentData] = useState({
    component1: [],
    component2: [],
    component3: [],
  });

  const getData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/components`);
      setContents(response.data.data);
      countApiCall();
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const countApiCall = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/components/count`);

      setApiCount({
        ...apiCount,
        addCount: response?.data?.addCount,
        updateCount: response?.data?.updateCount,
      });
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    countApiCall();
    setModalIsOpen(false);
    setIsEditClick(false);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/api/components/${id}`);
    getData();
  };

  return (
    <Box>
      <Box>
        <Header apiCount={apiCount} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "98%",
          justifyContent: "center",
        }}
      >
        <Box sx={{ marginTop: "30px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "30px",
              justifyContent: "center",
            }}
          >
            {[0, 1].map((index) => (
              <Resizable
                key={index}
                defaultSize={{
                  width: "48%",
                  padding: "10px",
                }}
                style={{ border: "1px solid black" }}
                minWidth={"30%"}
                minHeight={"190px"}
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
            // defaultSize={{ padding: "10px" }}
            style={{
              border: "1px solid black",
              marginTop: "30px",
              marginLeft: "15px",
            }}
            minWidth={"30%"}
            minHeight={"194px"}
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
    </Box>
  );
};

export default ResizableLayout;
