import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { MdOutlineSearchOff } from "react-icons/md";

import "./Careers.css";

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "50px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    textAlign: "left",
  }),
  menu: (provided) => ({
    ...provided,
    textAlign: "left",
  }),
};

function Careers() {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [searchJobTitle, setSearchJobTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const getFilteredJobs = (pageNumber = 1, title = "", location = "") => {
    setLoading(true);
    axios
      .get(
        `https://aira-tech-backend-1.onrender.com/jobs?page=${pageNumber}&limit=${itemsPerPage}&title=${title}&location=${location}`
      )
      // .get (
      //   `http://localhost:8080/jobs?page=${pageNumber}&limit=${itemsPerPage}&title=${title}&location=${location}`
      // )
      .then((response) => {
        setFilteredJobs(response.data.jobs);
        setTotalJobs(response.data.totalJobs);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const fetchJobTitles = () => {
    axios
      .get("https://aira-tech-backend-1.onrender.com/job-titles")
      // .get("http://localhost:8080/job-titles")
      .then((response) => {
        const options = response.data.map((title) => ({
          value: title,
          label: title,
        }));
        setJobTitleOptions(options);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchLocations = () => {
    axios
      .get("https://aira-tech-backend-1.onrender.com/locations")
      // .get("http://localhost:8080/locations")
      .then((response) => {
        const locations = response.data.map((loc) => ({
          value: `${loc.city}, ${loc.state}, ${loc.country}`,
          label: `${loc.city}, ${loc.state}, ${loc.country}`,
        }));
        setLocationOptions(locations);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getFilteredJobs(pageNumber, searchJobTitle, searchLocation);
  };

  const totalPages = Math.ceil(totalJobs / itemsPerPage);

  const handleSearch = () => {
    setCurrentPage(1);
    getFilteredJobs(1, searchJobTitle, searchLocation);
  };

  const handleViewJob = (jobId) => {
    window.open(`/jobs/${jobId}`, '_blank');
  };

  useEffect(() => {
    getFilteredJobs();
    fetchJobTitles();
    fetchLocations();
  }, []);

  return (
    <>
      <div className="page-description">
        <h2>Careers</h2>
      </div>
      <div className="careers-container">
        <div className="job-inputs">
          <div className="input-container container">
            <Select
              className="basic-single"
              styles={customStyles}
              isClearable={true}
              isSearchable={true}
              options={jobTitleOptions}
              onChange={(selectedOption) => setSearchJobTitle(selectedOption ? selectedOption.value : "")}
              placeholder="Job Title or Keyword"
            />
            <Select
              className="basic-single"
              styles={customStyles}
              isClearable={true}
              isSearchable={true}
              options={locationOptions}
              onChange={(selectedOption) => setSearchLocation(selectedOption ? selectedOption.value : "")}
              placeholder="Location"
            />
            <div className="search-jobs">
              <button onClick={handleSearch}>Search Jobs</button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loader-outer-layer"><div className="loader"></div></div>
        ) : filteredJobs.length === 0 ? (
          <div className="container no-data-text">
            <span><MdOutlineSearchOff style={{width: '80px', height: '80px', color: '#ee6767'}} />
            </span>
            <h3>No Match Results Found</h3>
          </div>
        ) : (
          <>
            <div className="container result-count">
              <p>
                Showing {itemsPerPage * (currentPage - 1) + 1}-
                {Math.min(itemsPerPage * currentPage, totalJobs)} of {totalJobs}{" "}
                open jobs
              </p>
            </div>
            <div className="filtered-jobs container">
              <div className="job-card">
                {filteredJobs.map((job) => (
                  <div className="job-content" key={job.JobId}>
                    <div className="job-details">
                      <div className="job-title-company">
                        <span>{job.RoleName}</span>
                        <p>{job.CompanyName}</p>
                      </div>
                      <div className="job-type">
                        <span>Job Type</span>
                        <p>{job.WorkEnv}</p>
                      </div>
                      <div className="job-location">
                        <span>Location</span>
                        <p>{job.City + ", " + job.State}</p>
                      </div>
                      <div className="job-posted-date">
                        <span>Posted Date</span>
                        <p>
                          {new Date(job.PostedDate).toLocaleDateString("en-US")}
                        </p>
                      </div>
                      <div className="job-apply" onClick={() => handleViewJob(job.JobId)}>
                        <button>View Job</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Careers;
