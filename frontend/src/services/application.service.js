import axios from 'axios';
import cookies from "js-cookie";

const applicationService = async (formData) => {
    try {
        const token = cookies.get("jwt-auth");
        const response = await axios.post(
            "http://localhost:3001/api/applications/",
            formData,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al enviar la solicitud de postulacion: ", error.response.data);
        throw error;
    }
};

export default applicationService;