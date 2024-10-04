import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import "./ServiceDetails.css";
import ServiceDetailsImage from "../../assets/ServiceDetails.jpg";

const serviceData = {
  staffing: {
    title: "Staffing Recruitment",
    description:
      "AiraTech Consultancy Services offers specialized staffing and recruitment solutions tailored to various industries, including IT, healthcare, finance, and engineering. Our expertise extends to virtual workforces, staff augmentation, and both retained and contingency services. We leverage advanced technology and a client-centric approach to provide flexible staffing solutions, ensure compliance, and deliver high-quality candidates who align with your organizational goals. Our commitment to innovation and adaptability helps meet diverse hiring needs and drive effective business growth.",
    capabilities: [
      "Comprehensive talent acquisition strategies tailored to industry needs.",
      "Advanced technology and AI-driven tools for efficient candidate sourcing.",
      "Rigorous screening and assessment processes to ensure candidate quality.",
      "Compliance with industry regulations and quality assurance throughout the recruitment process.",
      "Ongoing support to clients and candidates post-placement."
    ],
    approach:
      "Our approach begins with a thorough understanding of each client's industry and specific needs. We utilize cutting-edge technology and AI tools to enhance candidate sourcing and selection efficiency. By focusing on client satisfaction and proactive communication, we build long-term partnerships and deliver value through customized staffing solutions. Our dedication to quality assurance ensures that each recruitment process meets the highest standards.",
    workProcess: [
      "Conduct detailed consultations with clients to identify staffing requirements.",
      "Employ advanced technology and AI for candidate sourcing and screening.",
      "Present shortlisted candidates to clients after thorough assessments.",
      "Maintain compliance with industry standards and regulations throughout the recruitment process.",
      "Provide continuous support to both clients and candidates post-placement.",
      "Collect and utilize feedback to refine and improve recruitment strategies."
    ],
    images: [
      "path/to/staffing-recruitment-image1.jpg",
      "path/to/staffing-recruitment-image2.jpg",
      "path/to/staffing-recruitment-image3.jpg"
    ],
  },
  software: {
    title: "Software Development",
    description:
      "AiraTech offers end-to-end software development services, encompassing everything from initial concept and design to development, testing, and deployment. Our team specializes in building scalable and secure software solutions that meet the specific needs of various industries. We utilize modern development frameworks and technologies to ensure that our solutions are innovative, efficient, and aligned with industry best practices. Our goal is to deliver software that enhances business operations and drives technological advancement.",
    capabilities: [
      "Custom software development tailored to client specifications.",
      "Utilization of modern frameworks and technologies for robust and scalable solutions.",
      "Comprehensive testing and quality assurance to ensure reliability and performance.",
      "Integration with existing systems and third-party services.",
      "Post-launch support and maintenance to address any issues and enhance functionality."
    ],
    approach:
      "Our approach to software development is centered around understanding the unique needs of each client. We begin with a detailed requirement analysis and design phase, followed by iterative development and rigorous testing. By employing agile methodologies, we ensure flexibility and adaptability throughout the development process. Our focus on quality and client collaboration helps us deliver software solutions that drive business success and innovation.",
    workProcess: [
      "Initiate the project with a thorough requirement gathering and analysis phase.",
      "Design software solutions based on client needs and industry standards.",
      "Develop and test software iteratively, incorporating client feedback at each stage.",
      "Deploy the solution and ensure smooth integration with existing systems.",
      "Provide ongoing support and maintenance to address any issues and implement enhancements.",
      "Gather user feedback to inform future updates and improvements."
    ],
    images: [
      "path/to/software-development-image1.jpg",
      "path/to/software-development-image2.jpg",
      "path/to/software-development-image3.jpg"
    ],
  },
  core: {
    title: "Core Recruitment",
    description:
      "Core Recruitment focuses on providing specialized recruitment services for critical roles within organizations. We understand the importance of finding the right candidates for key positions and employ targeted strategies to attract and retain top talent. Our approach includes detailed role analysis, candidate sourcing, and assessment to ensure a perfect fit for core roles that drive organizational success. We work closely with clients to understand their core business needs and deliver recruitment solutions that align with their strategic objectives.",
    capabilities: [
      "Specialized recruitment for key roles critical to organizational success.",
      "Detailed role analysis to understand specific requirements and expectations.",
      "Targeted candidate sourcing to attract top talent for core positions.",
      "Comprehensive assessment and evaluation to ensure candidate suitability.",
      "Strategic partnership with clients to align recruitment solutions with business goals."
    ],
    approach:
      "Our core recruitment approach is designed to address the unique challenges of recruiting for critical roles. We start with an in-depth analysis of the role and its impact on the organization. Our team then employs targeted sourcing and assessment techniques to identify and attract top candidates. By aligning our recruitment strategies with the client's business objectives, we ensure that the candidates we present are well-suited to drive organizational success.",
    workProcess: [
      "Conduct a thorough analysis of the core role and its significance within the organization.",
      "Develop a targeted recruitment strategy to attract qualified candidates.",
      "Utilize specialized sourcing techniques to identify and engage top talent.",
      "Perform detailed assessments to evaluate candidate fit and capabilities.",
      "Present shortlisted candidates to clients and facilitate the selection process.",
      "Provide support throughout the hiring process to ensure a successful placement."
    ],
    images: [
      "path/to/core-recruitment-image1.jpg",
      "path/to/core-recruitment-image2.jpg",
      "path/to/core-recruitment-image3.jpg"
    ],
  },
  training: {
    title: "Training and Development",
    description:
      "Our Training and Development services focus on equipping individuals and teams with the skills and knowledge necessary for career growth and organizational success. We offer a range of training programs designed to enhance professional skills, leadership capabilities, and technical expertise. Our training solutions are customized to meet the specific needs of clients, ensuring that participants gain practical, actionable insights that can be applied in their roles. By investing in training and development, organizations can foster a culture of continuous improvement and excellence.",
    capabilities: [
      "Customized training programs tailored to the needs of individuals and teams.",
      "Focus on professional skill enhancement, leadership development, and technical training.",
      "Interactive and practical training methods to ensure effective learning.",
      "Post-training support and resources to reinforce learning and application.",
      "Evaluation and feedback to measure training effectiveness and impact."
    ],
    approach:
      "Our approach to training and development is centered around understanding the specific needs and goals of each client. We design and deliver customized training programs that address these needs, using interactive and engaging methods to ensure effective learning. Post-training support and evaluation help reinforce learning and measure the impact of the training. Our goal is to empower individuals and teams with the skills and knowledge needed to excel in their roles and contribute to organizational success.",
    workProcess: [
      "Identify training needs and objectives through consultations with clients.",
      "Design customized training programs based on identified needs and goals.",
      "Deliver training using interactive and practical methods to enhance learning.",
      "Provide post-training support and resources to reinforce key concepts.",
      "Evaluate training effectiveness and gather feedback to inform future programs.",
      "Continuously update and improve training content based on industry trends and client feedback."
    ],
    images: [
      "path/to/training-development-image1.jpg",
      "path/to/training-development-image2.jpg",
      "path/to/training-development-image3.jpg"
    ],
  }
};


const ServiceDetails = () => {
  const { serviceId } = useParams();
  const service = serviceData[serviceId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return <p>Service not found</p>; // Handle case where serviceId is invalid
  }

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
        {/* Uncomment and use additional images if available
        <div className="service-details-images">
          <img src={service.images[1]} alt={`${service.title} 1`} />
          <img src={service.images[2]} alt={`${service.title} 2`} />
        </div> */}
        <div className="capabilities-section">
          <h3>Our Capabilities</h3>
          <ul>
            {service.capabilities.map((capability, index) => (
              <li key={index} className="service-points">
                <div className="check-icon">
                  <div className="circle">
                    <FaCheck className="check" />
                  </div>
                </div>
                {capability}
              </li>
            ))}
          </ul>
        </div>
        <div className="approach-section">
          <h3>Our Approach</h3>
          <p>{service.approach}</p>
          <h3>Our Work Process</h3>
          <ul>
            {service.workProcess.map((process, index) => (
              <li key={index} className="service-points">
                <div className="check-icon">
                  <div className="circle">
                    <FaCheck className="check" />
                  </div>
                </div>
                {process}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
