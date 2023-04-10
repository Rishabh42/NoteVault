import axios from "axios";

// Create global axios instance
const instance = axios.create({
    withCredentials: true, // Makes your browser include cookies and authentication headers in requests (since we use an HTTP-only cookie for the JWT)
    baseURL: "/api"
})

export default instance;