import React, { useEffect, useState } from 'react';
import { useAuth } from "../store/Auth";
import { Link } from "react-router-dom";
 

const AdminContacts = () => {
    const { AuthorizationToken } = useAuth();
    const [contactData, setContactData] = useState([]);

    const getContactsData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setContactData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteContactById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });

            if (response.ok) {
                getContactsData(); // Refresh data
                alert("Contact Deleted Successfully");
            } else {
                 alert("Not Deleted");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getContactsData();
    }, []);

    return (
        <section className="admin-users-section"> {/* Reusing the same CSS class for layout */}
            <div className="container">
                <h1 className="main-heading">Admin Contact Data</h1>
            </div>
            
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactData.map((curContact, index) => {
                            const { username, email, message, _id } = curContact;
                            return (
                                <tr key={index}>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{message}</td>
                                    <td>
                                      <Link to={`/admin/contacts/${curContact._id}/edit`} className="btn-edit">Edit</Link>
</td>
                                    <td>
                                        <button className="btn-delete" onClick={() => deleteContactById(_id)}>
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
    );
};

export default AdminContacts;