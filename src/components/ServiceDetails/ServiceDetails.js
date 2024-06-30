import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import "./ServiceDetails.css";
import ServiceDetailsImage from "../../assets/ServiceDetails.jpg";

const serviceData = {
  financial: {
    title: "Staffing Recruitment",
    description:
      "AiraTech Consultancy Services is a dynamic staffing and recruiting solutions firm specializing in IT, healthcare, finance, and engineering industries. With a global reach and expertise in virtual workforces, staff augmentation, and retained/contingency services, AiraTech offers innovative and intelligent recruitment solutions. Leveraging advanced technology and a client-centric approach, they provide flexible staffing options, ensure compliance and quality assurance, and offer continuous support to foster long-term partnerships and organizational success. Their commitment to innovation and adaptability underscores their ability to meet diverse hiring needs and drive business growth effectively.",
    capabilities: [
      "Non saed velit dictum quam risus pharetra est.",
      "Id risus pharetra est, at rhoncus, nec ullamcorper tincidunt.",
      "Hac nibh fermentum nisi, platea condimentum cursus.",
      "Elit curabitur amet risus bibendum.",
    ],
    approach:
      "At AiraTech Consultancy Services, our approach is rooted in a deep understanding of our clients' industries and needs. We begin by meticulously analyzing the specific challenges and goals of each client, ensuring a tailored approach to every recruitment solution. Our commitment to innovation drives us to leverage cutting-edge technology and AI-driven tools, enhancing efficiency and accuracy in candidate sourcing and selection. We prioritize building long-term partnerships, focusing on client satisfaction and delivering value through proactive communication, transparency, and a keen emphasis on quality assurance.",
    workProcess: [
      "Conduct thorough consultations with clients to understand their staffing requirements.",
      "Utilize advanced technology and AI-driven tools for candidate sourcing.",
      "Implement rigorous screening and assessment processes to identify top candidates.",
      "Facilitate the selection process by presenting shortlisted candidates to clients.",
      "Ensure adherence to industry regulations and standards throughout the recruitment process.",
      "Provide ongoing support to clients and candidates post-placement.",
      "Gather feedback from clients and candidates to enhance future recruitment strategies.",
    ],
    images: ["ServiceDetailsImage", "path/to/image2.jpg", "path/to/image3.jpg"],
  },
  // Add similar data for other services
};

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const service = serviceData['financial'];


  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  return (
    <div className="service-details">
      <img
        src={ServiceDetailsImage}
        alt={service.title}
        className="service-details-image"
      />
      <div className="service-details-description">
        <h2>{service.title}</h2>
        <p>{service.description}</p>
        {/* <div className="service-details-images">
        <img src={service.images[1]} alt={`${service.title} 1`} />
        <img src={service.images[2]} alt={`${service.title} 2`} />
      </div> */}
        <div className="capabilities-section">
        <h3>Our Capabilities</h3>
        <ul>
          {service.capabilities.map((capability, index) => (
            <div className="service-points">
              <div clasName="check-icon">
                <div className="circle">
                  <div className="check"></div>
                </div>
              </div>
              <li key={index}>{capability}</li>
            </div>
          ))}
        </ul>
        </div>
        <div className="approach-section">
        <h3>Our Approach</h3>
        <p>{service.approach}</p>
        <h3>Our Work Process</h3>
        <ul>
          {service.workProcess.map((process, index) => (
            <div className="service-points">
              <div clasName="check-icon">
                <div className="circle">
                  <div className="check"></div>
                </div>
              </div>
              <li key={index}>{process}</li>
            </div>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
