import axios from "axios";

const API = axios.create({
    baseURL: "https://react-mailbox-client-4d34b-default-rtdb.firebaseio.com"
})

export default API;