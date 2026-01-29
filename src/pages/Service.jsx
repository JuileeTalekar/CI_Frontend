//  import useAuth from "../store/useAuth";
import "../components/Service.css";
import { useAuth } from "../store/Auth.jsx";

export const Service = () => {

  const { services  } = useAuth();   

  return (
    <section className="section-service">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-column">
        {services.map((service) => (
          <div className="card" key={service._id}>

            <div className="card-img">
              <img src="/images/design.png" alt={service.name} width="200" />
            </div>

            <div className="card-details">
              <div className="price-provider">
                <p className="provider">{service.provider}</p>
                <p className="price">₹{service.price}</p>
              </div>

              <h2 className="card-title">{service.name}</h2>
              <p className="card-description">{service.description}</p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
