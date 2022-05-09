import axios from 'axios'

const devEnv = process.env.NODE_ENV !== "production"
//Destructure process.env global variable to extract Dev & Prod URLs
const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env

const dbURL = "http://localhost:5000/users"

//use this TEMPLATE for all AXIOS calls
//Receive start, end from Component for pagination
export const loadUsersAPI = async (start, end) => {
    //http://localhost:5000/users?_start=0&_limit=4
    //http://localhost:5000/users?_start=0&_end=4

    //Before Pagination
    //return await axios.get(dbURL)

    //After Pagination
    //return await axios.get(dbURL + `?_start=${start}&_end=${end}`)

    //Decide URL based on environment
    return await axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `?_start=${start}&_end=${end}`)

    //return await axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`)
}

export const createUserAPI = async (user) => {
    // return await axios.post(dbURL, user)

    //Decide URL based on environment
    return await axios.post(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`, user)
}

//DID OWN
export const deleteUserAPI = async (userId) => {
    // http://localhost:5000/users/userId
    //return await axios.delete(dbURL + `/${userId}`)

    //Decide URL based on environment
    return await axios.delete(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `/${userId}`)
}

export const updateUserAPI = async (userId, userInfo) => {
    // http://localhost:5000/users/userId
    //return await axios.put(dbURL + `/${userId}`, userInfo)

    //Decide URL based on environment
    return await axios.put(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `/${userId}`, userInfo)
}

export const searchUserAPI = async (query) => {
    // http://localhost:5000/users?q=gitesh
    //return await axios.get(dbURL + `?q=${query}`)

    //Decide URL based on environment
    return await axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `?q=${query}`)
}

export const filterUserAPI = async (status) => {
    // http://localhost:5000/users?status=Active
    // http://localhost:5000/users?status=In-Active
    //return await axios.get(dbURL + `?status=${status}`)

    //Decide URL based on environment
    return await axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `?status=${status}`)
}

export const sortUserAPI = async (columnName) => {
    // http://localhost:5000/users?_sort=name&_order=asc
    //return await axios.get(dbURL + `?_sort=${columnName}&_order=asc`)

    //Decide URL based on environment
    return await axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `?_sort=${columnName}&_order=asc`)
}

