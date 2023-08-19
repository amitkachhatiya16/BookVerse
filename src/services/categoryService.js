import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api"

class CategoryService {

    GetAllCategories = async() => {
        return axios.get(`${BASEURL}/category/all`)
    }

    
    DeleteCategory = async(id) => {
        return axios.delete(`${BASEURL}/category?id=${id}`)
    };

    AddCategory = async(payload) => {
        return axios.post(`${BASEURL}/category`, payload)
    };

    GetCategoryById = async(id) => {
        return axios.get(`${BASEURL}/category/byid?id=${id}`)
    };

    EditCategory = async(payload) => {
        console.log(payload);
        console.log(payload);
        return axios.put(`${BASEURL}/category`, payload)
    };
}



// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService();