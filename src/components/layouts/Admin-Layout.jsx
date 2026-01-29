import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { FcServices } from "react-icons/fc";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { IoHome } from "react-icons/io5";

const AdminLayout = () => {
  return (
    <div>  
        {/* <h1>Admin Layout</h1> */}

    <header> 
      <div className='container'> 
       <nav>
          <ul> 
            {/* <li> <a href="/admin/users"> Users </a> </li> */}
            <li> <NavLink to="/admin/users"><FaUser /> Users </NavLink></li>
            <li> <NavLink to="/admin/contacts"><BiSolidContact /> Contacts </NavLink></li>
            <li> <NavLink to="service"><MdOutlineMiscellaneousServices /> Services </NavLink></li>
            <li> <NavLink to="/"><IoHome /> Home </NavLink></li>
          </ul>
       </nav>
      </div> 
    </header>
        <Outlet /> 
        
    </div>


     
  )
}

export default AdminLayout