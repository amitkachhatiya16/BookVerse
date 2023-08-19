import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api"

class UserService {

    GetAllUsers = async () => {
        return axios.get(`${BASEURL}/user/all`)
    }

    DeleteUser = async (id) => {
        return axios.delete(`${BASEURL}/user/?id=${id}`)
    };

    EditUserInfo = async(payload) => {
        return axios.put(`${BASEURL}/user`,payload)
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();