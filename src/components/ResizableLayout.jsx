import { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { ModalComponent } from "./ModalComponent";
import { Box } from "@mui/material";

import axios from "axios";
import { BASE_URL } from "../services/helper";
import { ComponentLayout } from "./ComponentLayout";
import { ThirdComponentLayout } from "./ThirdComponentLayout";
import { Header } from "./Header";

const MIN_WIDTH = 200;
const MIN_HEIGHT = 200;

const ResizableLayout = () => {
  const [componentWidths, setComponentWidths] = useState([
    window.innerWidth * 0.3,
    window.innerWidth * 0.7,
    window.innerWidth * 0.97,
  ]);

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

  const handleResize = (index, event, { size }) => {
    const newComponentWidths = [...componentWidths];
    newComponentWidths[index] = size.width;
    setComponentWidths(newComponentWidths);
  };

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
    const handleResize = () => {
      setComponentWidths([
        window.innerWidth * 0.3,
        window.innerWidth * 0.7,
        window.innerWidth * 0.97,
      ]);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          width: "100%",
          height: "100vh",
        }}
      >
        <Box>
          <Header />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {[0, 1].map((index) => (
            <ResizableBox
              key={index}
              width={componentWidths[index]}
              height={300}
              minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
              onResize={(event, size) => handleResize(index, event, size)}
              style={{
                border: "1px solid black",
                margin: "5px",
                overflow: "hidden",
                overflowY: "auto",
              }}
            >
              <ComponentLayout
                filterComponentData={filterComponentData}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                index={index}
                loading={loading}
              />
            </ResizableBox>
          ))}
        </Box>

        <ResizableBox
          width={componentWidths[2]}
          height={300}
          minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
          onResize={(event, size) => handleResize(2, event, size)}
          style={{
            border: "1px solid black",
            margin: "5px",
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          <ThirdComponentLayout
            filterComponentData={filterComponentData}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            loading={loading}
          />
        </ResizableBox>
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
