import { createContext, useContext , useState} from "react";
import { useEffect } from "react";

// create context
export const AuthContext = createContext();

// provide context
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
        const [services, setServices] = useState([]); // add services state
   const AuthorizationToken = `Bearer ${token}`;
  // function to store the token in local storage
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
     setToken(serverToken);
  };

   let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };


// AUTHENTICATION 
  // inside AuthProvider in Auth.jsx
const [user, setUser] = useState(null);

const userAuthentication = async () => {
  if (!token) {
    setUser(null);
    return;
  }
  try {
    const response = await fetch("http://localhost:5000/api/auth/user", {
      method: "GET",
      headers: {
        Authorization: AuthorizationToken,
      },
    });

    if (response.ok) {
      const data = await response.json(); // server returns { msg: userData }
      setUser(data.userData);
    } else {
      setUser(null);
      console.error("Error fetching user data");
    }
  } catch (error) {
    console.log(error);
  }
};

const getService = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/data/service", {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json(); // server returns { msg: userData }
      console.log("Service data:", data);
       setServices(data.msg);
    }

  } catch (error) {
    console.log(`Service frontend error: ${error}`);
  }
};


useEffect(() => {
  getService();
  userAuthentication();
}, [token]); // refetch when token changes





  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user ,services, AuthorizationToken}}>
      {children}
    </AuthContext.Provider>
  );
};

//  custom hook handeling useContext(consumer)
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
