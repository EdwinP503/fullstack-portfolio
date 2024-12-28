// File: src/components/AboutMe.js
import React, { useState } from 'react';
import './AboutMe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faServer, faSitemap, faTools } from '@fortawesome/free-solid-svg-icons';
import {
  faGoogle, faNodeJs, faReact, faGitAlt,
  faPython, faSlack } from '@fortawesome/free-brands-svg-icons';

function AboutMe() {
  const [showMore, setShowMore] = useState(false);

  {/* 2024 */}
  const timelineData1 = [
    {
      milestones: [
        {
          name: 'Software Engineer Intern - Rapid7',
          text: 'Designed and implemented automated solutions as part of the Automations & Productivity team, focusing on streamlining processes and IT integrations for operational efficiency.',
        }
      ]
    },
    {
      milestones: [
        {
          name: 'University of Massachusetts Boston - Bachelor of Science in Information Technology',
          text: 'Graduated with a focus on Systems Administration, completing coursework that prepared me for roles in IT operations and support.',
        }
      ]
    },
    {
      milestones: [
        {
          name: 'Print & Marketing Solutions Advisor - Staples',
          text: 'Assisted customers with shipping needs and promoted marketing solutions to small businesses, achieving high client retention.',
        }
      ]
    },
    {
      milestones: [
        {
          name: 'MERN Stack Developer - Hack.Diversity',
          text: 'Contributed to the back-end development of a CRUD web application for managing medical records using the MERN Stack (MongoDB, Express, React, Node.js)',
        }
      ]
    }
  ];

  {/* 2023 */}
  const timelineData2 = [
    {
      milestones: [
        {
          name: 'Delivery Driver - Developing Time Management and Customer Service',
          text: 'Delivered packages for Uber, UberEats, Amazon Flex, and Doordash, refining time management, navigation, and customer satisfaction skills.',
        }
      ]
    },
    {
      milestones: [
        {
          name: 'Construction Supervisor - G.P. Carpentry & Remodeling LLC',
          text: 'Led remodeling projects and a carpentry team, improving project completion rates through effective scheduling and resource management',
        }
      ]
    }
  ];

  {/* 2022 */}
  const timelineData3 = [
    {
      milestones: [
        {
          name: 'Research Assistant - Washington State University',
          text: 'Automated phenotyping data collection through image analysis for object recognition. Notable project: [Plant Phenotyping: Image Analysis of Pear Rootstocks using PlantCV]',
        }
      ]
    },
    {
      milestones: [
        {
          name: 'FedEx Ground - Opertations Administrator',
          text: 'Supported warehouse operations by reviewing, researching,  and entering data in multiple systems to enhance functional efficiency. Constantly communicating with customers for package pickup/drop-offs.',
        }
      ]
    }
  ];

  {/* 2021 */}
  const timelineData4 = [
    {
      milestones: [
        {
          name: "High School Tutor - East Boston Ecumenical Community Council (EBECC)",
          text: "Provided tutoring to students at East Boston High School for Math and Computer programming basics",
        }
      ]
    }
  ];

  {/* 2020 */}
  {/* 2029 */}

  const skills = [
    { icon: faNodeJs, label: 'Node.js' },
    { icon: faReact, label: 'React.js' },
    { icon: faPython, label: 'Python' },
    { icon: faGitAlt, label: 'Git' },
    { icon: faTools, label: 'Automation' },
    { icon: faServer, label: 'Sys Admin' },
    { icon: faSitemap, label: 'PM' },
    { icon: faSlack, label: 'Slack' },
    { icon: faGoogle, label: 'Google Suite' },
  ];
  
  return (
    <div className="about-me-container">
      {/* Skillset icons container */}
      <h2>Skills</h2>
      <div className="slider" style={{ '--width': '100px', '--height': '70px', '--quantity': skills.length }}>
        <div className="list">
          {[...skills, ...skills].map((skill, idx) => (
            <div className="item" key={idx} style={{ '--position': idx + 1 }}>
              <div className="icon-container">
                <FontAwesomeIcon icon={skill.icon} />
              </div>
              <p className="skill-label">{skill.label}</p>
            </div>
          ))}
        </div>
      </div>

      <h2>Experience Timeline</h2>
      <div className="timelines-container">
        {/* First timeline */}
        <div className="vertical-timeline">
          <div className="timeline-start">
            <div className="year-label">2024</div>
          </div>
          {timelineData1.map((yearData, index) => (
            <div className="milestones" key={index}>
              {yearData.milestones.map((milestone, idx) => (
                <div key={idx} className="milestone-dot">
                  <h3>{milestone.name}</h3>
                  <p>{milestone.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Read more button */}
        <div className="timeline-spacer-pro">
          <button 
            className="read-more-btn" 
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        </div>

        {/* Second timeline */}
        <div className={`vertical-timeline ${showMore ? 'visible' : 'hidden'}`}>
          <div className="timeline-start">
            <div className="year-label">2023</div>
          </div>
          {timelineData2.map((yearData, index) => (
            <div className="milestones" key={index}>
              {yearData.milestones.map((milestone, idx) => (
                <div key={idx} className="milestone-dot">
                  <h3>{milestone.name}</h3>
                  <p>{milestone.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Spacer between timelines */}
        <div className="timeline-spacer"></div>

        {/* Third timeline */}
        <div className={`vertical-timeline ${showMore ? 'visible' : 'hidden'}`}>
          <div className="timeline-start">
            <div className="year-label">2022</div>
          </div>
          {timelineData3.map((yearData, index) => (
            <div className="milestones" key={index}>
              {yearData.milestones.map((milestone, idx) => (
                <div key={idx} className="milestone-dot">
                  <h3>{milestone.name}</h3>
                  <p>{milestone.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Spacer between timelines */}
        <div className="timeline-spacer"></div>

        {/* Fourth timeline */}
        <div className={`vertical-timeline ${showMore ? 'visible' : 'hidden'}`}>
          <div className="timeline-start">
            <div className="year-label">2021</div>
          </div>
          {timelineData4.map((yearData, index) => (
            <div className="milestones" key={index}>
              {yearData.milestones.map((milestone, idx) => (
                <div key={idx} className="milestone-dot">
                  <h3>{milestone.name}</h3>
                  <p>{milestone.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
