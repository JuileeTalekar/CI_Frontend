import { useForm } from "react-hook-form";

const Hook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log("submitting the form data");
    console.log(data);
  }

  return (
    <div>
      <h1>This is Hook Page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        
        <div>
          <label>First Name:</label>

          <input
            className={errors.firstName ? "input-error" : ""}
            {...register("firstName", {
              required: { value: true, message: "First name is required" },
              maxLength: {
                value: 6,
                message: "Cannot exceed more than 6 characters",
              },
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
          />

          {errors.firstName && (
            <p className="error-message">{errors.firstName.message}</p>
          )}
        </div>

        
        <div>
          <label>Middle Name:</label>

          <input
            className={errors.middleName ? "input-error" : ""}
            {...register("middleName", {
              required: { value: true, message: "Middle name is required" },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Only alphabets are allowed",
              },
            })}
          />

          {errors.middleName && (
            <p className="error-message">{errors.middleName.message}</p>
          )}
        </div>

     
        <div>
          <label>Last Name:</label>
          <input
            className={errors.lastName ? "input-error" : ""}
            {...register("lastName", {
              required: { value: true, message: "Last name is required" },
            })}
          />

          {errors.lastName && (
            <p className="error-message">{errors.lastName.message}</p>
          )}
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Hook;
