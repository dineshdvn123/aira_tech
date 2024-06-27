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
import "./JobDetail.css";

function isNumeric(value) {
  if (!value) {
    return false;
  }
  return /^\d+$/.test(value);
}

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

// Create schema for yup validation
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .test("is-numeric", "Phone number must only contain digits", (value) =>
      isNumeric(value)
    )
    .test(
      "is-ten-digits",
      "Phone number must be 10 digits",
      (value) => value && value.length === 10
    )
    .required("Phone number is required"),
  resume: yup
    .mixed()
    .required("Resume is required")
    .test("fileSize", "The file is too large", (value) => {
      return value && value.size <= 2000000; // 2 MB
    })
    .test("fileType", "Only PDF files are accepted", (value) => {
      return value && value.type === "application/pdf";
    }),
});

function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // const response = await axios.get(`http://localhost:8080/jobs/${jobId}`);
        const response = await axios.get(`https://aira-tech-backend-1.onrender.com/jobs/${jobId}`);
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

  const {
    handleSubmit,
    setFocus,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setValue("resume", file); // Set file in form state
    }
  };

  const onSubmit = (data) => {
    console.log(data);
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
              onClick={() => setFocus("firstName")}
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
            <p className="form-header">Apply Here</p>

            {/* First Name and Last Name in one row */}
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <Controller
                  name="firstName"
                  control={control}
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
            Custom Upload
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => {
              handleFileChange(e);
              field.onChange(e.target.files[0]); // Set the file in react-hook-form
            }}
          />
          <p className="file-name" style={{ display: fileName.length === 0 ? 'none' : 'inline-block' }}>{fileName}</p>
                    </>
                )}
              />
              <p className="error-message">{errors.resume?.message}</p>
            </div>

            {/* Submit button */}
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
