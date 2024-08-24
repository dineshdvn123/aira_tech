import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
} from "date-fns";
import { CiWallet } from "react-icons/ci";
import axios from "axios";
import { Modal, Space } from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./JobDetail.css";

// Validation schema using Yup
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must only contain digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  resume: yup
    .mixed()
    .required("Resume is required")
    .test("fileSize", "The file is too large", (value) => {
      return value && value.size <= 2000000; // 2 MB
    })
    .test("fileType", "Only PDF or DOCX files are accepted", (value) => {
      return (
        value &&
        (value.type === "application/pdf" ||
          value.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      );
    }),
});

function getDateDifference(startDate, endDate) {
  const minutes = differenceInMinutes(endDate, startDate);
  const hours = differenceInHours(endDate, startDate);
  const days = differenceInDays(endDate, startDate);
  const months = differenceInMonths(endDate, startDate);

  if (months >= 1) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (days >= 1) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
}

function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [circleLoading, setCircleLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJob = async () => {
      try {
        // const response = await axios.get(`http://localhost:8080/jobs/${jobId}`);
        const response = await axios.get(`https://airatech-admin-backend.onrender.com/jobs/${jobId}`);
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Error fetching job details");
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setValue("resume", file); // Set file in form state
    }
     else {
    setFileName(""); // Clear the file name if no file selected
    setValue("resume", undefined);
  }
  };

  const onSubmit = async (data) => {
    setCircleLoading(true);
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("resume", data.resume);

    try {
      const response = await axios.post(
        // `http://localhost:8080/apply/${jobId}`,
        `https://airatech-admin-backend.onrender.com/apply/${jobId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setModalMessage(
          response.data.message || "Application submitted successfully!"
        );
        setSuccessModalVisible(true);
        setError(null); // Clear any previous error
        reset(); // Reset the form after successful submission
        setFileName("");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setModalMessage(
        error.response?.data.message || "Error submitting application"
      );
      setErrorModalVisible(true);
    }finally {
        setCircleLoading(false);
    }

  };

  const handleSuccessModalOk = () => {
    setSuccessModalVisible(false);
    // Additional logic after success modal closes
  };

  const handleErrorModalOk = () => {
    setErrorModalVisible(false);
    // Additional logic after error modal closes
  };

  if (loading) {
    return (
      <div className="loader-outer-layer">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>No job found</div>;
  }

  return (
    <div className="container">
      <div className="job-detail-card">
        <div className="job-detail-card-body">
          <div className="job-detail-card-body-header">
            <p className="job-detail-summary-title">
              JOBS / {job.WorkEnv} / {job.City}, {job.State}, {job.Country} /
              Posted {getDateDifference(job.PostedDate, new Date())} ago
            </p>
          </div>
          <div className="job-detail-card-title">
            <h1>{job.RoleName}</h1>
            <button
              type="button"
              className="btn-submit d-flex"
              onClick={() => setFocus("firstName")} // Manually trigger reset on Apply button click
            >
              Apply
            </button>
          </div>
          <h3 className="job-details-header">Job Details</h3>
          <div className="job-detail-section">
            <h4>Responsibilities:</h4>
            <div dangerouslySetInnerHTML={{ __html: job.Responsibilities }} />
          </div>
          <div className="job-detail-section">
            <h4>Qualifications:</h4>
            <div dangerouslySetInnerHTML={{ __html: job.Qualifications }} />
          </div>
          <div className="job-detail-section">
            <h4>Benefits:</h4>
            <div dangerouslySetInnerHTML={{ __html: job.Benefits }} />
          </div>
          <div className="job-detail-pay-scale">
            <CiWallet className="wallet-icon" />
            <p>Pay Scale : </p>
            <p>
              ${job.SalaryLow} - ${job.SalaryHigh}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <div className={circleLoading ? "circle-loader-container" : "hidden"}>
        <div className="circle-loader"></div>
      </div>
            <p className="form-header">Apply Here</p>

            {/* First Name and Last Name in one row */}
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input {...field} className="form-control" />
                  )}
                />
                <p className="error-message">{errors.firstName?.message}</p>
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input {...field} className="form-control" />
                  )}
                />
                <p className="error-message">{errors.lastName?.message}</p>
              </div>
            </div>

            {/* Email and Phone in one row */}
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input {...field} className="form-control" />
                  )}
                />
                <p className="error-message">{errors.email?.message}</p>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input {...field} className="form-control" />
                  )}
                />
                <p className="error-message">{errors.phone?.message}</p>
              </div>
            </div>

            {/* Resume upload */}
            <div className="form-group file">
              <label>Resume</label>
              <Controller
                name="resume"
                control={control}
                render={({ field }) => (
                  <>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      Upload
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf, .docx"
                      onChange={(e) => {
                        handleFileChange(e);
                        e.target.value = null;
                      }}
                      style={{ display: "none" }}
                    />
                    <p>{fileName}</p>
                  </>
                )}
              />
              <p className="error-message">{errors.resume?.message}</p>
            </div>
           
            {/* Submit Button */}
            <div>
            <button type="submit" className="btn-submit" style={{width : '100px'}}>
                Submit
            </button>
            </div>
            
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        title={
          <Space size={8} align="center">
            <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 24 }} />
            <span>Application Submitted Successfully</span>
          </Space>
        }
        visible={successModalVisible}
        onOk={handleSuccessModalOk}
        onCancel={handleSuccessModalOk}
      >
        <p>{modalMessage}</p>
      </Modal>

      {/* Error Modal */}
      <Modal
        title={
          <Space size={8} align="center">
            <ExclamationCircleOutlined
              style={{ color: "#ff4d4f", fontSize: 24 }}
            />
            <span>Application Already Submitted</span>
          </Space>
        }
        visible={errorModalVisible}
        onOk={handleErrorModalOk}
        onCancel={handleErrorModalOk}
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}

export default JobDetail;
