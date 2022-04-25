import axios from 'axios'

const dbURL = "http://localhost:5000/users"

//use this TEMPLATE for all AXIOS calls
export const loadUsersAPI = async () => {
    return await axios.get(dbURL)
}

export const createUserAPI = async (user) => {
    return await axios.post(dbURL, user)
}

//DID OWN
export const deleteUserAPI = async (userId) => {
    // http://localhost:5000/users/userId
    return await axios.delete(dbURL + `/${userId}`)
}

export const updateUserAPI = async (userId, userInfo) => {
    // http://localhost:5000/users/userId
    return await axios.put(dbURL + `/${userId}`, userInfo)
}

