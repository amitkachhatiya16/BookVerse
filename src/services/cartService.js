import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api";

class CartService {

        AddToCart = async (data) => {
    return axios.post(`${BASEURL}/cart`, data);
        };

        GetCartList = async (id) => {
    return axios.get(`${BASEURL}/cart?userId=${id}`);
        };

        UpdateItem = async (data) => {
    return axios.put(`${BASEURL}/cart`, data);
        };

        RemoveItem = async (id) => {
    return axios.delete(`${BASEURL}/cart?id=${id}`);
        };

        ConfirmOrder = async (data) => {
            return axios.post(`${BASEURL}/order`, data);
                };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CartService();