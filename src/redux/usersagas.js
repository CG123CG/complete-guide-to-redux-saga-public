import {
    take,
    takeEvery,
    takeLatest,
    put,
    all,
    delay,
    fork,
    call
} from 'redux-saga/effects'

//Imports for Action Creators
import {
    loadUsersSuccess,
    loadUsersError,
    createUserSuccess,
    createUserError,
    deleteUserSuccess,
    deleteUserError,
    updateUserSuccess,
    updateUserError
} from './actions'
import * as types from './actionTypes'
import {
    loadUsersAPI,
    createUserAPI,
    deleteUserAPI,
    updateUserAPI
} from './api'


//###################################################################################
//             WORKER SAGAS - LOADING, CREATING, DELETING, UPDATING
//###################################################################################

//Worker Saga - LOADING
function* onLoadUsersStartAsync() {
    try {
        //Call - Blocking
        //call: run a method, Promise or other Saga
        //call: Wait for the promise to finish
        //call: The argument should be a function that returns a promise
        const response = yield call(loadUsersAPI)
        if (response.status === 200) {
            yield delay(500)
            console.log(response.data)
            yield put(loadUsersSuccess(response.data))
        }
    }
    catch (error) {
        console.log(error.response.status, error.response.statusText)
        yield put(loadUsersError(error.response.status))
    }
}

//Worker Saga - CREATING
//WHY destructuring is required for payload??
function* onCreateUserStartAsync({ payload }) {
    try {
        //Call - Blocking
        //call: run a method, Promise or other Saga
        //call: Wait for the promise to finish
        //call: The argument should be a function that returns a promise
        const response = yield call(createUserAPI, payload)
        if (response.status === 201) {
            console.log(response.data)
            yield put(createUserSuccess())
        }
    }
    catch (error) {
        console.log(error.response.status, error.response.statusText)
        yield put(createUserError(error.response.status))
    }
}

//Worker Saga - DELETING
function* onDeleteUserStartAsync(userId) {
    try {
        //Call - Blocking
        //call: run a method, Promise or other Saga
        //call: Wait for the promise to finish
        //call: The argument should be a function that returns a promise
        const response = yield call(deleteUserAPI, userId)
        //At this point, user is deleted fron DB file, but not the STORE
        if (response.status === 200) {
            yield delay(500)
            //Response is empty {}
            console.log(response.data)
            //DELETE_USER_SUCCESS Action requires userId payload to delete the user
            //Below Action/Action-Creator deletes the user from the STORE
            yield put(deleteUserSuccess(userId))
        }
    }
    catch (error) {
        console.log(error.response.status, error.response.statusText)
        yield put(deleteUserError(error.response.status))
    }
}

//Worker Saga - UPDATING
//Using 2nd Level of Object destructuring - get id, formValue
function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
    try {
        console.log("payload id", id)
        console.log("payload formValue", formValue)

        //Call - Blocking
        //call: run a method, Promise or other Saga
        //call: Wait for the promise to finish
        //call: The argument should be a function that returns a promise
        const response = yield call(updateUserAPI, id, formValue)
        if (response.status === 200) {
            console.log(response.data)
            yield put(updateUserSuccess())
        }
    }
    catch (error) {
        console.log(error.response.status, error.response.statusText)
        yield put(updateUserError(error.response.status))
    }
}


//###################################################################################
//             WATCHER SAGAS - LOADING, CREATING, DELETING, UPDATING
//###################################################################################

//Watcher Saga for Loading Users
function* onLoadUsers() {
    //takeEvery - Non-Blocking
    yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync)
}

//Watcher Saga for Creating a User
function* onCreateUser() {
    //takeEvery - Non-Blocking
    yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync)
}

//Watcher Saga for Deleting a User
function* onDeleteUser() {
    //take
    //Blocking
    //Dispatches an action matching the pattern argument to the Store
    //The Generator is suspended until an action that matches pattern is dispatched
    //The result of yield take(pattern) is an action object being dispatched

    while (true) {
        //DELETE_USER_START Action has a payload userId

        //take the payload property from the action object through
        //object destructuring and return a variable called payload
        //which contains the data of the payload property of the action object
        //Using the aliasing feature of object destructuring payload is aliased to userId
        const { payload: userId } = yield take(types.DELETE_USER_START)

        //Without Object destructuring
        //const action = yield take(types.DELETE_USER_START)
        //const userId = action.payload
        //call: run a method, Promise or other Saga
        yield call(onDeleteUserStartAsync, userId)
    }
}

//Watcher Saga for Updating a User
function* onUpdateUser() {
    //takeEvery - Non-Blocking
    yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync)
}


//###################################################################################
//                          WATCHER SAGAS ARRAY
//###################################################################################

//Watcher Sagas
//userSagas Array to be used in rootSaga
const userSagas = [
    //fork - Non-Blocking
    fork(onLoadUsers),
    fork(onCreateUser),
    fork(onDeleteUser),
    fork(onUpdateUser)
]

//###################################################################################
//                              ROOT SAGA
//###################################################################################

export default function* rootSaga() {
    yield all([
        //Allow all the forked processes to be created in parallel
        ...userSagas
    ])
}


//###################################################################################
//             DELETE USERS code using takeEvery instead of take
//###################################################################################
/*

//Worker Saga
function* onDeleteUserStartAsync({ payload: userId }) {
    try {
        //Call - Blocking
        //call: run a method, Promise or other Saga
        //call: Wait for the promise to finish
        //call: The argument should be a function that returns a promise
        const response = yield call(deleteUserAPI, userId)
        //At this point, user is deleted fron DB file, but not the STORE
        if (response.status === 200) {
            yield delay(500)
            //Response is empty {}
            console.log(response.data)
            //DELETE_USER_SUCCESS Action requires userId payload to delete the user
            //Below Action/Action-Creator deletes the user from the STORE
            yield put(deleteUserSuccess(userId))
        }
    }
    catch (error) {
        console.log(error.response.status, error.response.statusText)
        yield put(deleteUserError(error.response.status))
    }
}


//Watcher Saga for Deleting a User
function* onDeleteUser() {
    //takeEvery - Non-Blocking
    yield takeEvery(types.DELETE_USER_START, onDeleteUserStartAsync)
}

*/

