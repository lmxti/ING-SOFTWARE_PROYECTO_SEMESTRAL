import axios from "axios";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

export const uploadPDF = async (file, personId) => {
  const formData = new FormData();
  formData.append("pdf", file);

  try {
    const token = Cookie.get("jwt-auth");
    const decodedToken = jwt.decode(token)
    console.log(decodedToken.id)
    if (decodedToken){
      const personId = decodedToken.id;
      const response = await axios.post(
        `http://localhost:3001/api/pdf/${personId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 201) {
        console.log("Se ha subido correctamente el PDF");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPDF = async () => {
  try {
    const token = Cookie.get("jwt-auth");
    const decodedToken = jwt.decode(token)
    console.log(decodedToken.id)
    if (decodedToken){
      const personId = decodedToken.id;
      const response = await axios.get(
        `http://localhost:3001/api/pdf/${personId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.status === 200) {
        console.log("Se ha obtenido correctamente el PDF");
        return response.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
