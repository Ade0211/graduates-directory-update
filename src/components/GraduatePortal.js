import React from "react";
import { Link } from "react-router-dom";
import { GraduateContext } from "../context/graduate-context";
import { Card, Space, Tag, Collapse, Row, Divider, Typography } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import {
  GithubOutlined,
  LinkedinOutlined,
  FilePdfOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import parse from "html-react-parser";
import { useAuth0 } from "@auth0/auth0-react";

const { useContext } = React;

const GraduatePortal = ({ graduate }) => {
  const { user } = useAuth0();
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(GraduateContext);
  const { Meta } = Card;
  const { Panel } = Collapse;

  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });
  const { Title } = Typography;

  console.log(user, graduate);
  if (!graduate) return "loading";

  return (
    <div className="site-card-wrapper">
      <Card
        hoverable
        title={<Title level={3}>{graduate.fullname}</Title>}
        bordered={false}
        style={{ width: 390, margin: 15, maxHeight: 1200 }}
        extra={
          graduate.email === user.email ? (
            <Link to={`/graduates/${graduate._id}`}>
              <IconFont type="icon-tuichu" style={{ width: "40px" }} />
            </Link>
          ) : (
            ""
          )
        }
      >
        <Meta
          title={graduate.headline}
          description={graduate.current_location}
        />
        <hr />
        <p>
          Language:{""} {graduate.languages}{" "}
        </p>
        <Divider orientation="left">Work Availability</Divider>
        <Row>
          <p>
            {graduate.willing_relocate && (
              <Tag color={"magenta"}>Open To Relocate</Tag>
            )}
          </p>
          <p>
            {graduate.willing_remote && (
              <Tag color={"geekblue"}>Open To Remote</Tag>
            )}
          </p>
          <p>{graduate.part_time && <Tag color={"purple"}>Part Time</Tag>}</p>
          <p>{graduate.temp && <Tag color={"green"}>Temp</Tag>}</p>{" "}
          <p>{graduate.contract && <Tag color={"volcano"}>Contract</Tag>}</p>
          <p>{graduate.full_time && <Tag color={"green"}>Full Time</Tag>}</p>
          <p>{graduate.internship && <Tag color={"purple"}>Internship</Tag>}</p>
        </Row>

        <Divider orientation="left"></Divider>
        <Row>
          <Space>
            <a href={graduate.githubId}>
              <GithubOutlined
                style={{ FontSize: "60px", color: "black", width: "10rem" }}
              />
            </a>

            <LinkedinOutlined
              style={{ FontSize: "60px", color: "black", width: "10rem" }}
            />
          </Space>
        </Row>
        <br />
        <Row>
          <Space>
            <FilePdfOutlined
              label="CV"
              style={{ fontSize: "40px", color: "black", width: "10rem" }}
            />

            <GlobalOutlined
              label="Website"
              style={{ fontSize: "40px", color: "black", width: "10rem" }}
            />
          </Space>
        </Row>
        <br />
        <Collapse ghost>
          <Panel header="Read Resume" key="1">
            <p>
              {typeof graduate.resume_text === "string" &&
                parse(graduate.resume_text)}
            </p>
            {/* <p>{graduate.resume_text}</p> */}
          </Panel>
        </Collapse>
        {/* <Space>
          <>
            <Link to="/contact">
              <Button type="primary">Email CYF</Button>
            </Link>
          </>
        </Space> */}
      </Card>
    </div>
  );
};
export default GraduatePortal;
