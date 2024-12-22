# Portfolio Website with Serverless Contact Form Integration

Welcome to the repository for my personal portfolio website! This project serves as a showcase of my technical skills, professional projects, and accomplishments. It also features a serverless contact form for seamless communication and highlights my expertise in frontend development, backend integrations, and cloud architecture.

Check out the live version of my portfolio: [edwin-boston.com](https://edwin-boston.com)

## 📖 Table of Contents

1. [Project Overview](#project-portfolio)
2. [Technologies Used](#technologies-used)
3. [Architecture Overview](#architecture-overview)
4. [Setup and Installation](#setup-and-installation)
5. [Testing](#testing)
6. [Future Enhancements](#future-enhancements)
7. [Contact](#contact)

## Project Overview
__Frontend__
- Responsive Design: Fully responsive and optimized for all devices using modern CSS frameworks.
- Dynamic Portfolio Showcase: Highlights projects, skills, and professional milestones with interactive visuals and animations.
- Skill Visualization: A unique, alternating layout with hover effects to display technical proficiencies.
- Interactive Timeline: Displays a detailed history of experiences and achievements.
- Contact Section: Enables visitors to send messages directly from the site using a serverless contact form.

__Backend__
- **Serverless Contact Form**:
     - Built using AWS Lambda, API Gateway, and DynamoDB.
     - Processes contact form submissions securely without the need for a traditional server.
     - Implements CORS and a custom domain for security and performance.
- **MongoDB Integration (Legacy Backend)**:
     - Supports CRUD operations for dynamic data management (e.g., blog posts or projects).
     - Includes a connection to MongoDB for potential backend expansion.
     - Automated Testing:
          - Jest tests for ensuring robustness of the MongoDB integration and backend logic.

## Technologies Used
__Frontend__
- React.js: Component-based library for building a dynamic and responsive UI.
- CSS3 & SASS: For styling and responsive layouts.
- Netlify: Hosting and deployment.

__Backend__
- Serverless Framework: Deployed on AWS Lambda with API Gateway and DynamoDB.
- MongoDB: For traditional backend data storage.
- Node.js: Backend runtime environment.

__Testing__
- Jest: Automated testing for the backend logic.
  No sensitive data (e.g., API keys or MongoDB credentials) is exposed or required during testing.

__Cloud Services__
- AWS Lambda: Executes the contact form logic without the need for a server.
- API Gateway: Manages the API endpoint for the serverless function.
- DynamoDB: Stores contact form submissions.

## Architecture Overview
__Frontend Architecture__
- Single Page Application (SPA): Built using React, ensuring seamless navigation.
- Hosted on Netlify for fast and reliable delivery.

__Serverless Contact Form Workflow__
1. Frontend:
     - The user submits a message via the contact form.
     - A POST request is sent to `https://api.example.com/saveContact`.

2. AWS API Gateway:
     - Acts as a secure entry point for the serverless backend.
     - Validates requests and routes them to the Lambda function.

3. AWS Lambda:
     - Processes the contact form submission.
     - Saves the data into DynamoDB.

4. DynamoDB:
     - Stores form submissions for later review.

## Setup and Installation
__Frontend Setup__
1. **Clone the Repository and navigate to the frontend folder**:
   ```bash
   git clone https://github.com/EdwinP503/edwin-fullstack-portfolio.git
   cd edwin-fullstack-portfolio/frontend

2. **Install Dependencies**:
   ```bash
   npm install

4. **Run the frontend locally**:
   ```bash
   npm start

5. The frontend will run on `http://localhost:3000`.

__Backend Setup (MongoDB Integration)__
1. Navigate to the backend folder:
     ```bash
     cd edwin-fullstack-portfolio/backend

2. Install dependencies:
     ```bash
     npm install

3. Set up a `.env` file with the following:
     ```bash
     MONGO_URI=<your-mongodb-uri>

4. Run the backend locally:
     ```bash
     node server.js

__Serverless Setup (AWS Lambda Contact Form)__
1. Deployed the serverless function using AWS or the Serverless Framework. Follow the instructions in AWS Lambda Functions to upload `lambda-contact-handler folder` as a .zip file.
2. Ensured the AWS API Gateway is configured with the correct endpoint: `https://api.example/contactRoute`.

## Testing
__Backend Tests__
1. Navigate to the backend folder:
     ```bash
     cd backend

2. Run Jest tests:
     ```bash
     npm test

3. Tests will validate:
     - MongoDB connection.
     - API response correctness.

## Future Enhancements
- Automate code testing and linting during pull requests to maintain code quality using GitHub Actions for CI/CD.
- Develop an Admin Dashboard to view and manage contact form submissions.
- Automatically send acknowledgment emails to people who submit the contact form using AWS SES or a similar service.
- Upload GitHub repositories for previous projects (e.g. Plant Phenotyping projects).
- Fetch GitHub repository data (name, description, and recent updates) dynamically to display on your portfolio.
- Make the portfolio website more interactive by improving responsiveness across devices (mobile-first optimizations).

## Contact
Feel free to connect with me for job opportunities, collaborations, or feedback:

* Email: edwin-polanco-it@outlook.com
* Portfolio: [edwin-boston.com](https://edwin-boston.com)
* LinkedIn: [linkedin.com/in/edwin-polanco](https://www.linkedin.com/in/edwin-polanco/)

This project demonstrates my ability to design, develop, and deploy a robust and scalable portfolio website with modern technologies and cloud services. Thank you for visiting my repository! 🙌

## License and Viewing Permissions
This repository is available for viewing under the **Creative Commons Attribution-NoDerivs 4.0 International (CC BY-ND 4.0)** license. The use of the backend structure, serverless logic, or design must include attribution to the creator and is limited to personal, non-commercial use.

[View the License](https://creativecommons.org/licenses/by-nd/4.0/legalcode)
