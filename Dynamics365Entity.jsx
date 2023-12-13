import React, { useState, useEffect } from "react";
import { UserPlus, Save, XSquare, Edit, Trash2, ExternalLink, Link2} from "react-feather";
import { Link } from "react-router-dom"; 
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";

const Dynamics365Entity = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    EmployeesID: "",
    FirstName: "",
    LastName: "",
  });

  const handleIdChange = (e) => {
    setFormData({
      ...formData,
      EmployeesID: e.target.value,
    });
  };

  const handleFirstNameChange = (e) => {
    setFormData({
      ...formData,
      FirstName: e.target.value,
    });
  };

  const handleLastNameChange = (e) => {
    setFormData({
      ...formData,
      LastName: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAdd = () => {
    const newUser = {
      EmployeesID: formData.EmployeesID,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      ItemLink: formData.ItemLink,
    };
    setUsers([...users, newUser]);
    setFormData({
      EmployeesID: "",
      FirstName: "",
      LastName: "",
      ItemLink: "",
    });
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setFormData({
      EmployeesID: user.EmployeesID,
      FirstName: user.FirstName,
      LastName: user.LastName,
      ItemLink: user.ItemLink,
    });
  };

  const handleSave = () => {
    const updatedUsers = users.map((user) => {
      if (user.EmployeesID === selectedUser.EmployeesID) {
        return {
          ...user,
          EmployeesID: formData.EmployeesID,
          FirstName: formData.FirstName,
          LastName: formData.LastName,
          ItemLink: formData.ItemLink,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSelectedUser(null);
    setIsEditMode(false);

    const postData = {
      EmployeesID: formData.EmployeesID,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      ItemLink: formData.ItemLink,
    };

    fetch(
      "https://prod-14.centralindia.logic.azure.com:443/workflows/217efe8467b24a79941bc0abbac4da30/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2tFlQ4aPY4GqLiyH2X0EkrqDHOliq0uY2cF4ZEaEK_E",
      {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setIsEditMode(false);
  };

  useEffect(() => {
    fetch(
      "https://prod-14.centralindia.logic.azure.com:443/workflows/217efe8467b24a79941bc0abbac4da30/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2tFlQ4aPY4GqLiyH2X0EkrqDHOliq0uY2cF4ZEaEK_E",
      { method: "POST" }
    )
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const filteredUsers = users.filter((user) => {
    return `${user.EmployeesID} ${user.FirstName} ${user.LastName} ${user.ItemLink}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    
    return (
      <div style={{ marginLeft: "190px", marginTop: "-20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginLeft: "-80px" }}
          />
           <Link to={`/edit-employee/${users.EmployeesID}`} style={{ width: "100px" }}>  
          <button class="btn btn-success d-grid gap-2 col-6 mx-auto" type="button">
            <UserPlus size="30px" onClick={handleAdd} cursor="pointer" style={{ marginLeft: "-3px" }} />
          </button>
        </Link>
        </div>
        {isEditMode ? (
          <div>
            <input
              type="text"
              placeholder="Edit Employees ID"
              value={formData.EmployeesID}
              onChange={handleIdChange}
              name="EmployeesID"
              style={{ marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="Edit First Name"
              value={formData.FirstName}
              onChange={handleFirstNameChange}
              name="FirstName"
              style={{ marginBottom: "10px" }}
            />
            <input
              type="text"
              placeholder="Edit Last Name"
              value={formData.LastName}
              onChange={handleLastNameChange}
              name="LastName"
              style={{ marginBottom: "10px" }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                class="btn btn-success"
                onClick={handleSave}
                style={{ cursor: "pointer" }}
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={handleCancel}
                style={{ cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div style={{ width: "400px", marginLeft: "-80px" }}>
            <table
              class="table table-hover"
              style={{ width: "500px", margin: "15 auto" }}
            >
              <thead>
                <tr marginLeft="20px">
                  <th>EmployeesID</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Actions</th>
                  <th>Item Link</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.EmployeesID}>
                    <td>{user.EmployeesID}</td>
                    <td>{user.FirstName}</td>
                    <td>{user.LastName}</td>
                    <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Link to={`/edit-employee/${user.EmployeesID}`} style={{ cursor: "pointer" }} class="btn btn-success">
                        <Edit
                          size="20px"
                          onClick={() => handleEdit(user)}
                          style={{ cursor: "pointer", marginTop: "-8px", paddingTop: "4px" }}
                        />
                      </Link>
                     </div>
                  </td>
                    <td>
                    <div style={{ display: "flex", justifyContent: "center" }}>
  <button
    style={{ cursor: "pointer", marginTop: "-0px" }} 
    onClick={() => window.open(`${user.ItemLink}`, '_blank')}
    class="btn btn-success" 
  >
    {/* <div>{user.ItemLink} {user.FirstName} The item link</div> */}
    <Link2  size="20px"
                          style={{ cursor: "pointer", marginTop: "-8px", paddingTop: "4px" }}/>
  </button>
</div>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
};

export default Dynamics365Entity;
