  import { useState } from "react";
  // import { useAuth } from "../store/auth";
  import {useNavigate} from 'react-router-dom';
  import { useAuth } from "../store/Auth.jsx";
  import { toast } from "react-toastify";
  const API = import.meta.env.VITE_API_URL;

 export const Login = () => {
   
    const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // const { saveTokenInLocalStr } = useAuth();
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        
         setUser({ username: "", email: "", phone: "", password: "" });
        console.log("after login: ", responseData);
        // toast.success("Registration Successful");
        storeTokenInLS(responseData.token);
        // console.log("Login Token:", responseData.token);
        navigate("/");
      }else{
        const msg = responseData.extraDetails ?  responseData.extraDetails : responseData.message || "Registration failed";
        toast.error(msg);
        console.log("Validation Error:", responseData); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>This is the Login Page</h1>
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="login-image reg-img">
                <img
                  src="/images/login.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main login code  */}
              <div className="login-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};


