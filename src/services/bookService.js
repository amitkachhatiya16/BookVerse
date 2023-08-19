// import axios from "axios";

// const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";
// class BookService
// {
//     GetAllBooks = async(payload) =>
//     {
//         return axios.post(`${BASEURL}/all`, payload);
//     };
// }

// // eslint-disable-next-line import/no-anonymous-default-export
// export default new BookService();

import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api"

class BookService {


    GetAllBooks = async(payload) => {
        return axios.get(`${BASEURL}/book/all`, payload)
    };

    searchAllBooks = async (filters) => {
        console.log(filters)
        return axios.get(`${BASEURL}/book/search?keyword=${filters.keyword}`)
    };

    GetBookById = async (id) => {
        return axios.get(`${BASEURL}/book?id=${id}`)
    };

    DeleteBook = async (id) => {
        return axios.delete(`${BASEURL}/book?id=${id}`)
    };

    AddNewBook = async (payload) => {
        return axios.post(`${BASEURL}/book`,payload)
    };

    UpdateBook = async (payload) => {
        return axios.put(`${BASEURL}/book`,payload)
    };
}



// eslint-disable-next-line import/no-anonymous-default-export
export default new BookService();