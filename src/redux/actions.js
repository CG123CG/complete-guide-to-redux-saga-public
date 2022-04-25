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

//Receive userId from dispatch call in handleSubmit() in AddEditUser.js----------------



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

export const updateUserSuccess = () => (
    {
        type: types.UPDATE_USER_SUCCESS
    }
)

//Will receive error from Saga post API call
export const updateUserError = (error) => (
    {
        type: types.UPDATE_USER_ERROR,
        payload: error
    }
)

