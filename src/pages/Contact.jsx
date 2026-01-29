import { useState, useEffect } from "react";
import { useAuth } from "../store/Auth";

export const Contact = () => {


  const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};
  const [contact, setContact] = useState(defaultContactFormData);

  const { user } = useAuth();

  // Populate form when user data arrives
  useEffect(() => {
    if (user && user.username && user.email) {
      setContact({
        username: user.username,
        email: user.email,
        message: "",
      });
    }
  }, [user]); // Only run when user changes

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  //form subit 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contact);

     try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      console.log("response: ", response);
      // alert(response);

      if (response.ok) {
        setContact(defaultContactFormData);
        const responseData = await response.json();
        alert("Message sent successfully!");
        console.log(responseData);
      } else {
        // Handle API error here
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <>
      <h1>contact us</h1>
      <section className="section-contact">
        <div className="contact-content container"></div>

        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" />
          </div>

          <section className="section-form">
            <h1 className="main-heading mb-3">contact form</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.724039268416!2d73.84962007501306!3d18.469777282558227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ebf6ed80d5cb%3A0x8e946585a20e2b15!2sGulab%20Nagar%2C%20Dhankawadi%2C%20Pune%2C%20Maharashtra%20411043!5e0!3m2!1sen!2sin!4v1730824042129!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};