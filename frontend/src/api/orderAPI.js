import axiosClient from "./axiosClient";

const orderAPI = {
    getMyOrders: () => {
        const url = '/orders/myorders';
        return axiosClient.get(url);
    },

    getAll: () => {
        const url = '/orders';
        return axiosClient.get(url);
    },

    getOrderById: (id) => {
        const url = `/orders/${id}`;
        return axiosClient.get(url);
    },

    createOrder: (data) => {
        const url = '/orders/add/';
        return axiosClient.post(url, data);
    },

    payOrder: (id, data) => {
        const url = `/orders/${id}/paid/`;
        return axiosClient.put(url, data);
    }
}

export default orderAPI;