import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useAuth } from "../store/Auth";
// import toast from "react-hot-toast";


export const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams(); 
    const navigate = useNavigate();
    const { AuthorizationToken } = useAuth(); 

    // Fetch Single User Data
    const getSingleUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            const userData = await response.json();
            
           // important to set data in correct way  
            setData(userData); 
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleUserData();
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
             const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                     Authorization: AuthorizationToken,
                },
                body: JSON.stringify(data),
            });
            
            if(response.ok){
                 toast.success("Updated Successfully");
                 navigate("/admin/users");
            } else {
                 toast.error("Not Updated");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="section-contact">
             {/* Centered Container for the whole update card */}
            <div className="container" style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                
                {/* Title Updated User Data - Now directly above form */}
                <h1 className="main-heading" style={{marginBottom: "2rem"}}>Update User Data</h1>

                <div className="section-form" style={{maxWidth: "500px", width: "100%"}}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="off"
                                value={data.username} // Autopopulated via state
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
                                value={data.email} // Autopopulated via state
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                autoComplete="off"
                                value={data.phone} // Autopopulated via state
                                onChange={handleInput}
                                required
                            />
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