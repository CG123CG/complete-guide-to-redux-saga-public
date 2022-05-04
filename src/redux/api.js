import axios from 'axios'

const devEnv = process.env.NODE_ENV !== "production"
const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env

const dbURL = "http://localhost:5000/users"

//use this TEMPLATE for all AXIOS calls
export const loadUsersAPI = async () => {
    //return await axios.get(dbURL)

    return await axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`)
}

export const createUserAPI = async (user) => {
    // return await axios.post(dbURL, user)

    return await axios.post(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`, user)
}

//DID OWN
export const deleteUserAPI = async (userId) => {
    // http://localhost:5000/users/userId
    //return await axios.delete(dbURL + `/${userId}`)

    return await axios.delete(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `/${userId}`)
}

export const updateUserAPI = async (userId, userInfo) => {
    // http://localhost:5000/users/userId
    //return await axios.put(dbURL + `/${userId}`, userInfo)


    return await axios.put(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `/${userId}`, userInfo)
}

export const searchUserAPI = async (query) => {
    // http://localhost:5000/users?q=gitesh
    return await axios.get(dbURL + `?q=${query}`)

    //return await axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `?${query}`)
}

export const filterUserAPI = async (status) => {
    // http://localhost:5000/users?status=Active
    // http://localhost:5000/users?status=In-Active
    return await axios.get(dbURL + `?status=${status}`)

    //return await axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `?status${status}`)
}

export const sortUserAPI = async (columnName) => {
    // http://localhost:5000/users?_sort=name&_order=asc
    return await axios.get(dbURL + `?_sort=${columnName}&_order=asc`)

    //return await axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}` + `?_sort=${columnName}&_order=asc`)
}

