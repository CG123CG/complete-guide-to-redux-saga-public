import * as types from './actionTypes'

// Action Creators - function that returns an action object

//###################################################################################
//             LOAD USERS
//###################################################################################

export const loadUsersStart = () => (
    {
        type: types.LOAD_USERS_START
    }
)

//Will receive users from Saga post API call
export const loadUsersSuccess = (users) => (
    {
        type: types.LOAD_USERS_SUCCESS,
        payload: users
    }
)

//Will receive error from Saga post API call
export const loadUsersError = (error) => (
    {
        type: types.LOAD_USERS_ERROR,
        payload: error
    }
)

//###################################################################################
//             CREATE USERS
//###################################################################################

//Receive user details from Add User Details Form submission in AddEditUser.js
export const createUserStart = (user) => (
    {
        type: types.CREATE_USER_START,
        payload: user
    }
)

export const createUserSuccess = () => (
    {
        type: types.CREATE_USER_SUCCESS
    }
)

//Will receive error from Saga post API call
export const createUserError = (error) => (
    {
        type: types.CREATE_USER_ERROR,
        payload: error
    }
)

//###################################################################################
//             DELETE USERS
//###################################################################################

//Receive userId from dispatch call in handleDelete() in Home.js
export const deleteUserStart = (userId) => (
    {
        type: types.DELETE_USER_START,
        payload: userId
    }
)

//Require userId to Delete using array.filter()
export const deleteUserSuccess = (userId) => (
    {
        type: types.DELETE_USER_SUCCESS,
        payload: userId
    }
)

//Will receive error from Saga post API call
export const deleteUserError = (error) => (
    {
        type: types.DELETE_USER_ERROR,
        payload: error
    }
)

//###################################################################################
//             UPDATE/EDIT USERS
//###################################################################################

//Receive details from dispatch call in handleSubmit() in AddEditUser.js
//dispatch(updateUserStart({ id, formValue }))
//Need to receive 2 things from the Component (AddEditUser.js) performing Update
//1 - Updated user details and 2 - user id
//Above 2 details must come as a single Object because
//2 different arguments cannot passed in an Action Creator
export const updateUserStart = (updatedUserInfo) => (
    {
        type: types.UPDATE_USER_START,
        payload: updatedUserInfo
    }
)

//OWN - Added Payload to be able to update the STORE
export const updateUserSuccess = (payload) => (
    {
        type: types.UPDATE_USER_SUCCESS,
        payload: payload
    }
)

//Will receive error from Saga post API call
export const updateUserError = (error) => (
    {
        type: types.UPDATE_USER_ERROR,
        payload: error
    }
)

//###################################################################################
//             SEARCH USERS
//###################################################################################

//Receive query from dispatch call in handleSubmit() in NavBar.js
//Component handling the search will provide the search query
export const searchUserStart = (query) => (
    {
        type: types.SEARCH_USER_START,
        payload: query
    }
)

//Search Query execution will return back searchedUsers
export const searchUserSuccess = (searchedUsers) => (
    {
        type: types.SEARCH_USER_SUCCESS,
        payload: searchedUsers
    }
)

//Will receive error from Saga post API call
export const searchUserError = (error) => (
    {
        type: types.SEARCH_USER_ERROR,
        payload: error
    }
)

//###################################################################################
//             FILTER USERS
//###################################################################################

//Receive status from dispatch call in onFilterChange() in Home.js
//Component handling the filter search will provide the status
export const filterUserStart = (status) => (
    {
        type: types.FILTER_USER_START,
        payload: status
    }
)

//Upon success, Search Query execution will return back filterUsers
export const filterUserSuccess = (filterUsers) => (
    {
        type: types.FILTER_USER_SUCCESS,
        payload: filterUsers
    }
)

//Will receive error from Saga post API call
export const filterUserError = (error) => (
    {
        type: types.FILTER_USER_ERROR,
        payload: error
    }
)

