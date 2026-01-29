import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { Link } from "react-router-dom"; 

const AdminUsers = () => {
  const { AuthorizationToken } = useAuth();
  const [Users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const responce = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await responce.json();
      setUsers(data);
    } catch (error) {
      console.log("Error while fetching all users data:", error);
    }
  };

  // Define delete function (logic to be implemented later)
  const deleteUser = async(id) => {
    try{
    console.log("Delete user:", id);
    const responce = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
    });

    const data = await responce.json();
    console.log(data);
    // Refresh the users list after deletion
    getAllUsersData();
  } catch(error){
    console.log("Error while deleting user:", error);
  }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1 className="main-heading">Admin Users Data</h1>
        </div>

        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td>
                        {/* Edit Button */}
                        <Link to={`/admin/users/${curUser._id}/edit`} className="btn-edit">
                          Edit
                        </Link>
                    </td>
                    <td>
                        {/* Delete Button */}
                        <button className="btn-delete" onClick={() => deleteUser(curUser._id)}>
                          Delete
                        </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminUsers;