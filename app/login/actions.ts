"use server";

const handleForm = async (prevState: any, formData: FormData) => {
  console.log("running in the server!!");
  console.log(prevState);
  console.log(formData.get("email"), formData.get("password"));
  return {
    errors: ["wrong password", "passowrd is too short"],
  };
};

export { handleForm };
