import axios from "./root.service";


export const getRequirements = async () => {
    try {
        return axios.get("/requirements");
    } catch (error) {
        console.log('Error en grant.service -> getGrants', error.message);
    }
};