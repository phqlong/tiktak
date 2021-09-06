import axiosClient from "./axiosClient";

const productAPI = {
    getAll: (params) => {

        const url = `/products?${params}`;
        return axiosClient.get(url);
    },

    get: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },

    createReview: (id, review) => {
        const url = `/products/${id}/reviews/`;
        return axiosClient.post(url, review);
    },
}

export default productAPI;