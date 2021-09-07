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

    getUserProfile: (id) => {
        const url = `/users/${id}/`;
        return axiosClient.get(url);
    },

    updateUserProfile: (data) => {
        const url = `/users/profile/update/`;
        return axiosClient.put(url, data);
    },
}

export default userAPI;