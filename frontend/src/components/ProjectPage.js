// File: src/components/ProjectPage.js
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './ProjectPage.css';

function ProjectPage() {
  const projects = [
    {
      title: "Enterprise Automation using Okta Workflows and Workato",
      period: "Jun 2024 - Aug 2024",
      organization: "Rapid7",
      image: require("../assets/images/enterprise-automation.jpg"),
      summary: "Automated user account provisioning and deprovisioning across global offices, freeing up staff hours and reducing errors.",
      skills: "Skills: Process Automation, Okta, Workato, Team Collaboration, Leadership",
    },
    {
      title: "Back End Development of a Medical CRUD Application",
      period: "Feb 2024 - Apr 2024",
      organization: "Hack.Diversity",
      image: require("../assets/images/mern-app.jpg"),
      summary: "Developed back-end of a CRUD web application for medical records using the MERN stack, handling over 1000+ records.",
      skills: "Skills: Node.js, Express.js, MongoDB, REST APIs, Team Collaboration",
    },
    {
      title: "Plant Phenotyping: Image Analysis of Pear Rootstocks",
      period: "Jun 2022 - Jul 2022",
      organization: "Washington State University",
      image: require("../assets/images/plantcv-1.jpg"),
      summary: "Increased phenotyping data collection efficiency by 60%, achieving 97% data accuracy for architectural traits in pear rootstocks.",
      skills: "Skills: Data Analysis, Python, PlantCV Library",
    },
    {
      title: "Phenotyping Analysis: Pearl Millet Panicles",
      period: "Nov 2021 - Feb 2022",
      organization: "University of Massachusetts Boston",
      image: require("../assets/images/plantcv-2.jpg"),
      summary: "Automated measurement extraction from Pearl millet panicle images using the PlantCV library, increasing monitoring efficiency by 80%.",
      skills: "Skills: Automation, Python, Image Processing",
    },
    /*{
      title: "Phenotypic Data Analysis with PlantCV",
      period: "Oct 2020 - Nov 2021",
      organization: "University of Massachusetts Boston",
      image: require("../assets/images/plantcv-3.jpg"),
      summary: "Developed a Python script using PlantCV to detect cranberries affected by fruit rot, helping improve breeding programs.",
      skills: "Skills: Automation, Python, Image Processing",
    }*/
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const selectProject = (index) => {
    setActiveIndex(index); // Set the clicked card as active
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextProject, // Swipe left to next
    onSwipedRight: prevProject, // Swipe right to previous
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div>
      {/* Introduction Text */}
      <div className="project-intro">
        <h2>Featured Projects</h2>
        <p>
          Explore some of my most exciting projects
        </p>
      </div>
      <div className="carousel-container" {...handlers} aria-live="polite">
        <div className="carousel" role="region" aria-label="Project carousel">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`carousel-card ${
                idx === activeIndex ? 'active' : idx === (activeIndex - 1 + projects.length) % projects.length ? 'prev' : idx === (activeIndex + 1) % projects.length ? 'next' : ''
              }`}
              onClick={() => selectProject(idx)} // Click action to select a card
              aria-label={`Project titled ${project.title}. Click for more details.`}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                loading="lazy" // Lazy load images
              />
              <div className="project-details">
                <h3>{project.title}</h3>
                <h4>{project.organization}</h4>
                <p>{project.period}</p>
              </div>
              <div className="overlay">
                <h4>{project.organization}</h4>
                <p>{project.summary}</p>
                <p>{project.skills}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Swipe Instruction for Mobile */}
      <div className="swipe-instruction">
        <p>
          <span className="swipe-arrows">{"<<<"}</span> Swipe <span className="swipe-arrows">{"  >>>"}</span>
        </p>
      </div>
    </div>
  );
}

export default ProjectPage;
