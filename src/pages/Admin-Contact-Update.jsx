import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";

export const AdminContactUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const { AuthorizationToken } = useAuth();

  const getSingleContactData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      const contactData = await response.json();
      setData(contactData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleContactData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: AuthorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Contact Updated Successfully");
        navigate("/admin/contacts");
      } else {
        alert("Not Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-contact">
      {/* Centered layout matching Admin-Update.jsx */}
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="main-heading" style={{ marginBottom: "2rem" }}>
          Update Contact Data
        </h1>

        <div
          className="section-form"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="6"
                autoComplete="off"
                value={data.message}
                onChange={handleInput}
                required
              ></textarea>
            </div>

            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
