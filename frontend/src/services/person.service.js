import axios from "./root.service";

export const register = async (registerCredentials) => {
    try {
        return axios.post("/persons", registerCredentials);
        
    } catch (error) {
        console.log('Error en person.service -> register', error.message);
    }
};
