import React, { useContext, useEffect } from "react";
import axios from "axios";
import GraduateList from "../components/graduate-list";
import { GraduateContext } from "../context/graduate-context";
import { FlashMessage, flashErrorMessage } from "../components/flash-message";
import GraduateSearch from "../components/GraduateSearch";
import { Col } from "antd";

const GraduateHomePage = () => {
  const [state, dispatch] = useContext(GraduateContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/graduates");
        dispatch({
          type: "FETCH_GRADUATES",
          payload: response.data.data || response.data, //in case pagination is disabled
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);
  console.log(state);
  return (
    <div style={{ padding: "0 40px" }}>
      <Col>
        <GraduateSearch />
        {state.message.content && <FlashMessage message={state.message} />}
        <GraduateList graduates={state.filteredGraduates || state.graduates} />
      </Col>
    </div>
  );
};

export default GraduateHomePage;
