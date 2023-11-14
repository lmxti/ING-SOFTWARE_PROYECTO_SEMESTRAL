import axios from 'axios';

const apiUrl = 'http://localhost:3001/api';

const api = {
    async login({ email, password }) {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}

export default api;