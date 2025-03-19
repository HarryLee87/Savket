"use server";

const handleForm = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  return {
    errors: ["wrong password", "passowrd is too short"],
  };
};

export { handleForm };
