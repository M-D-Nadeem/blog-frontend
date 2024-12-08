import axios from "axios";

const axiosInstance=axios.create()

axiosInstance.defaults.baseURL="http://16.171.1.181:3000/"
axiosInstance.defaults.withCredentials=true

export default axiosInstance