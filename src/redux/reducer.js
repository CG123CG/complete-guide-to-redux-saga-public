import * as types from './actionTypes'

const initialState = {
    users: [],
    loading: false,
    error: null,
    pageLimit: 4,
    currentPage: 0,
    paginationMode: true
}

function usersReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case types.LOAD_USERS_START:
        case types.CREATE_USER_START:
        case types.DELETE_USER_START:
        case types.UPDATE_USER_START:
        case types.SEARCH_USER_START:
        case types.FILTER_USER_START:
        case types.SORT_USER_START:
            //console.log("Action Object ", action)
            newState = {
                ...state,
                loading: true
            }
            break
        case types.LOAD_USERS_SUCCESS:
            newState = {
                ...state,
                loading: false,
                users: action.payload.users,
                currentPage: state.currentPage + action.payload.currentPage,
                paginationMode: true
            }
            break
        case types.SEARCH_USER_SUCCESS:
        case types.FILTER_USER_SUCCESS:
        case types.SORT_USER_SUCCESS:
            newState = {
                ...state,
                loading: false,
                users: action.payload,
                paginationMode: false
            }
            break
        case types.CREATE_USER_SUCCESS:
            newState = {
                ...state,
                loading: false,
                currentPage: 0
            }
            break
        case types.UPDATE_USER_SUCCESS:
            //OWN ADDED
            //console.log("Payload in UPDATE_USER_SUCCESS", action.payload)
            const { id, ...formValue } = action.payload
            //console.log("id in UPDATE_USER_SUCCESS", id)
            //console.log("formValue in UPDATE_USER_SUCCESS", formValue)
            newState = {
                ...state,
                loading: false,
                //Using Spread Operator - Merge existing user with formValue
                users: state.users.map(user => (user.id === id ? { ...user, ...formValue } : user)),
                currentPage: 0
            }
            break
        case types.DELETE_USER_SUCCESS:
            newState = {
                ...state,
                loading: false,
                users: state.users.filter((user) => user.id !== action.payload),
                currentPage: 0
            }
            break
        case types.LOAD_USERS_ERROR:
        case types.CREATE_USER_ERROR:
        case types.DELETE_USER_ERROR:
        case types.UPDATE_USER_ERROR:
        case types.SEARCH_USER_ERROR:
        case types.FILTER_USER_ERROR:
        case types.SORT_USER_ERROR:
            newState = {
                ...state,
                loading: false,
                error: action.payload
            }
            break
        default:
            return state
    }
    return newState
}

export default usersReducer

