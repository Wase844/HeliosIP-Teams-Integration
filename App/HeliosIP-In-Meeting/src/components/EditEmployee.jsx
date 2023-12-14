// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./App.css";

function EditEmployee() {
  const [isPopup, setIsPopup] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const flowId = 'your_flow_id'
  const accessToken = 'your_access_token'
;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("Form data:", data);
    // Update the employee data using the API endpoint
    try {
      const response = await fetch(
        `https://prod-13.centralindia.logic.azure.com:443/workflows/2b563d21a1594bf0bda46f4d6f339d3f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xdJobsYJ5kRA1HUtxevqV_PpSIOpW8TNPWHwS3qDqyY/${id}`, // Replace with your actual API endpoint
        {
          method: "POST", // Use the appropriate HTTP method for updating data
          headers: {
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setIsPopup(true);
        console.log("Request successful!");

        // Redirect to the employee list after successful update
        setTimeout(() => {
          navigate("/dynamic365-entity");
        }, 2000);
      } else {
        // Log additional information for debugging
        console.log("API error details:", {
          status: response.status,
          statusText: response.statusText,
        });

        // Handle API error
        let errorData;
        try {
          // Check if the response text is available
          const responseText = await response.text();
          if (responseText) {
            errorData = JSON.parse(responseText);
            console.log("Error data:", errorData);
          } else {
            console.error("Empty response body");
          }
        } catch (error) {
          console.error("Failed to parse error response:", error);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    // Fetch employee data based on the ID from the API and populate the form
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(
          `https://prod-13.centralindia.logic.azure.com:443/workflows/2b563d21a1594bf0bda46f4d6f339d3f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xdJobsYJ5kRA1HUtxevqV_PpSIOpW8TNPWHwS3qDqyY/${id}`, // Replace with your actual API endpoint
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              
            },
          }
        );
        console.log("API response:", response);
        if (response.ok) {
          const data = await response.json();
          // Populate the form with fetched data
          Object.entries(data).forEach(([key, value]) => {
            const inputElement = document.getElementById(key);
            if (inputElement) {
              inputElement.value = value;
            }
          });
          console.log(data);
        } else {
          // Handle API error
          console.log("API error:", response.status, response.statusText);
          try {
            const errorData = await response.json();
            console.log("Error data:", errorData);
          } catch (error) {
            console.error("Failed to parse error response:", error);
          }
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  useEffect(() => {
    if (isPopup) {
      const timeout = setTimeout(() => {
        setIsPopup(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isPopup]);

  return (
    <div className="main-container">
      {isPopup && (
        <div className="popup">
          <h6 className="text-success g-3">User updated successfully!</h6>
        </div>
      )}

      <button className="mb-2 btn btn-success mb-4">
        <Link to="/dynamic365-entity" className="text-white text-decoration-none">
          Employee List
        </Link>
      </button>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="EmployeesID" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="EmployeesID"
            name="EmployeesID"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="FirstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="FirstName"
            name="FirstName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="LastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="LastName"
            name="LastName"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
