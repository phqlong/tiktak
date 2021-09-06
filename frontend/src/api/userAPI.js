import axiosClient from "./axiosClient";

const userAPI = {
    login: (params) => {
        const url = "/users/login/";
        return axiosClient.post(url, params);
    },

    register: (params) => {
        const url = "/users/register/";
        return axiosClient.post(url, params);
    },
}

export default userAPI;