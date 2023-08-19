import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";
class AuthService
{
    Login = async(payload) =>
    {
        return axios.post(`${BASEURL}/login`, payload);
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();