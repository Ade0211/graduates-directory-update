import React, { useContext, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { inputField } from "../pages/Inputs";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { GraduateContext } from "../context/graduate-context";
import { flashErrorMessage } from "./flash-message";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/////new Editor
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Layout, Divider, Row, Button, Space, Checkbox, Col } from "antd";
import Dropzone from "react-dropzone";

const AddGraduates = ({ graduate }) => {
  const [state, dispatch] = useContext(GraduateContext);
  const [redirect, setRedirect] = useState(false);
  ///file state
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef();
  ////////////////////////////////
  let history = useHistory();
  const { control, errors, handleSubmit } = useForm({
    defaultValues: graduate,
  });

  const createGraduate = async (data) => {
    const formData = new FormData();
    formData.append("uri", file);
    try {
      const response = await axios({
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
        },
        url: "http://localhost:3030/graduates",
        // "https://teamb-grads.herokuapp.com/graduates",
        data: formData,
      });
      dispatch({
        type: "CREATE_GRADUATE",
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  ///////File Upload////
  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
    console.log(uploadedFile);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  function handleCancel() {
    history.push("/graduates");
  }

  const onSubmit = async (data) => {
    await createGraduate({
      data: {
        file,
      },
    });
  };

  if (redirect) {
    return <Redirect to={`/graduates`} />;
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <Layout>
      {/* <Divider orientation="left">
        <h1 style={{ marginTop: "1em" }}>
          {graduate._id ? "Edit Your Profile" : "Add Your Profile"}
        </h1>
      </Divider> */}
      <Row style={{ width: "60%" }} wrap={false}>
        <Col flex="none">
          <div style={{ padding: "0 40px" }}></div>
        </Col>
        <Col flex="auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            loading={state.loading}
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            <div className="input-group">
              <label className="label">Full Name</label>
              <Controller
                as={inputField("fullname")}
                name="fullname"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
              {errors.fullname && (
                <span className="error">This field is required</span>
              )}
            </div>
            <div className="input-group">
              <label className="label">Headline</label>
              <Controller
                as={inputField("Headline")}
                name="headline"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
              {errors.headline && (
                <span className="error">This field is required</span>
              )}
            </div>
            <div className="input-group">
              <label className="label">Language</label>
              <Controller
                as={inputField("languages")}
                name="languages"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
              {errors.languages && (
                <span className="error">This field is required</span>
              )}
            </div>
            <div className="input-group">
              <label className="label">Current Location</label>
              <Controller
                as={inputField("current_location")}
                name="current_location"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                spellCheck="true"
              />
              {errors.current_location && (
                <span className="error">This field is required</span>
              )}
            </div>
            <Divider orientation="left">Work Types</Divider>
            <Space>
              <Row>
                <div className="input-group">
                  <Controller
                    control={control}
                    name="full_time"
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Checkbox
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.checked)}
                        checked={value}
                        inputRef={ref}
                        defaultValue={false}
                      >
                        Full Time
                      </Checkbox>
                    )}
                  />
                </div>
                <div className="input-group">
                  <Controller
                    control={control}
                    name="part_time"
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Checkbox
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.checked)}
                        checked={value}
                        inputRef={ref}
                        defaultValue={false}
                      >
                        Part Time
                      </Checkbox>
                    )}
                  />
                </div>
                <div className="input-group">
                  <Controller
                    control={control}
                    name="willing_relocate"
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Checkbox
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.checked)}
                        checked={value}
                        inputRef={ref}
                        defaultValue={false}
                      >
                        Relocate
                      </Checkbox>
                    )}
                  />
                </div>
                <div className="input-group">
                  <Controller
                    control={control}
                    name="willing_remote"
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Checkbox
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.checked)}
                        checked={value}
                        inputRef={ref}
                        defaultValue={false}
                      >
                        Remote
                      </Checkbox>
                    )}
                  />
                </div>
                <div className="input-group">
                  <Controller
                    control={control}
                    name="internship"
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Checkbox
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.checked)}
                        checked={value}
                        inputRef={ref}
                        defaultValue={false}
                      >
                        Internship
                      </Checkbox>
                    )}
                  />
                </div>
              </Row>
              <br />
              <Row>
                <div className="input-group">
                  <Controller
                    control={control}
                    name="contract"
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Checkbox
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.checked)}
                        checked={value}
                        inputRef={ref}
                        defaultValue={false}
                      >
                        Contract
                      </Checkbox>
                    )}
                  />
                </div>
                <div className="input-group">
                  <Controller
                    control={control}
                    name="temp"
                    render={({ onChange, onBlur, value, name, ref }) => (
                      <Checkbox
                        onBlur={onBlur}
                        onChange={(e) => onChange(e.target.checked)}
                        checked={value}
                        inputRef={ref}
                        defaultValue={false}
                      >
                        Temp
                      </Checkbox>
                    )}
                  />
                </div>
              </Row>
            </Space>

            <Divider orientation="left">Work Media</Divider>
            <Space>
              <div className="input-group">
                <label className="label">Website</label>
                <Controller
                  as={inputField("Website")}
                  name="website"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div className="input-group">
                <label className="label">Linkedin</label>
                <Controller
                  as={inputField("linkedin")}
                  name="linkedin"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div className="input-group">
                <label className="label">Github Nickname</label>
                <Controller
                  as={inputField("Github Nickname")}
                  name="github_nickname"
                  control={control}
                  defaultValue=""
                />
              </div>
            </Space>
            <Divider orientation="left">Private Details</Divider>
            <Space>
              <div className="input-group">
                <label className="label">Mobile</label>
                <Controller
                  as={inputField("Mobile Number")}
                  name="mobile"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                />
                {errors.languages && (
                  <span className="error">Please enter your mobile number</span>
                )}
              </div>

              <div className="input-group">
                <label className="label">Email</label>
                <Controller
                  as={inputField("Email")}
                  name="email"
                  control={control}
                  defaultValue=""
                />
              </div>
            </Space>
            <Divider />

            <Divider />

            <Divider>
              <div className="upload-section">
                <Dropzone
                  onDrop={onDrop}
                  onDragEnter={() => updateBorder("over")}
                  onDragLeave={() => updateBorder("leave")}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps({ className: "drop-zone" })}
                      ref={dropRef}
                    >
                      <input {...getInputProps()} />
                      <p>Drag and drop a file OR click here to select a file</p>
                      {file && (
                        <div>
                          <strong>Selected file:</strong> {file.name}
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
                {previewSrc ? (
                  isPreviewAvailable ? (
                    <div className="image-preview">
                      <img
                        className="preview-image"
                        src={previewSrc}
                        alt="Preview"
                      />
                    </div>
                  ) : (
                    <div className="preview-message">
                      <p>No preview available for this file</p>
                    </div>
                  )
                ) : (
                  <div className="preview-message">
                    <p>Image preview will be shown here after selection</p>
                  </div>
                )}
              </div>
            </Divider>

            <div className="input-group">
              <label className="label">Resume Text</label>
              <Controller
                control={control}
                name="resume_text"
                error={errors.description}
                render={({ onChange, onBlur, value }) => (
                  <ReactQuill
                    theme="snow"
                    onChange={(description, delta, source, editor) =>
                      onChange(description)
                    }
                    control={control}
                    style={{ height: "500px" }}
                    value={value || ""}
                  />
                  // <></>
                )}
              />
            </div>
            {/* <div className="input-group">
<label className="label">Resume Text</label>
<Controller
control ={control}
name = "resume_text"
error={errors.description}
render={({ onChange, onBlur, value }) => (
  <Editor
  type="text"
  name="resume_text"
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  control ={control}
  as={inputField("resume_text")}
  onChange={(e) => onChange(e.target.value)}
  />
  )}
/>
</div> */}
            <Divider />
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={handleCancel} type="primary" htmlType="submit">
                Cancel
              </Button>
            </Space>
          </form>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddGraduates;
