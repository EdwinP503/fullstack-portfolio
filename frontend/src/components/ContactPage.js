import React, { useState } from 'react';
import './ContactPage.css';
import axios from 'axios';

function ContactPage() {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for validation and feedback messages
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  // State for loading spinner

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: '' }); // Clear error message when user corrects the field
    }
  };

  // Validation function
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email is invalid';
    if (!formData.message) formErrors.message = 'Message is required';
    return formErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);  // Show loading spinner

    try {
      // Get API URL from environment variable
      const apiUrl = process.env.REACT_APP_API_URL;

      // Make POST request using Axios
      const response = await axios.post(apiUrl, formData);

      // Handle response
      if (response.status === 200) {
        setSuccess(true); // Show success message
        setMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });  // Clear form fields
      } else {
        setSuccess(false);
        setMessage('There was an issue with your submission. Please try again later.');
      }

      // Hide the success message after 10 seconds
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
      }, 10000);  // 10 seconds
    } catch (error) {
      if (error.response) {
        // Server errors (e.g., 500)
        if (error.response.status === 400) {
          setMessage('There was a problem with your submission. Please check your input and try again.');
        } else if (error.response.status >= 500) {
          setMessage('There was an issue with the server. Please try again later.');
        }
      } else if (error.request) {
        // No response received from the server
        setMessage('No response from the server. Please try again later.');
      } else {
        // Other errors
        setMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);  // Hide loading spinner
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Contact me</h2>
          <p className="lead">
            Feel free to reach out for inquiries, feedback, or just to say hello! Or <a href="https://calendly.com/edwinpolanco/new-meeting" target="_blank" rel="noopener noreferrer"> book some time to meet! </a>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
              />
              {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            </div>
            <div className="d-grid">
              <button type="submit" className="btn-ab" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
          {message && !success && <div className="mt-4 alert alert-danger">{message}</div>}
          {success && <div className="mt-4 alert alert-info">{message}</div>}
          {isLoading && (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
