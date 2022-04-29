import * as types from './actionTypes'

const initialState = {
    users: [],
    loading: false,
    error: null
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
            //console.log("Action Object ", action)
            newState = {
                ...state,
                loading: true
            }
            break
        case types.LOAD_USERS_SUCCESS:
        case types.SEARCH_USER_SUCCESS:
        case types.FILTER_USER_SUCCESS:
            newState = {
                ...state,
                loading: false,
                users: action.payload
            }
            break
        case types.CREATE_USER_SUCCESS:
            newState = {
                ...state,
                loading: false,
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
                users: state.users.map(user => (user.id === id ? { ...user, ...formValue } : user))
            }
            break
        case types.DELETE_USER_SUCCESS:
            newState = {
                ...state,
                loading: false,
                users: state.users.filter((user) => user.id !== action.payload)
            }
            break
        case types.LOAD_USERS_ERROR:
        case types.CREATE_USER_ERROR:
        case types.DELETE_USER_ERROR:
        case types.UPDATE_USER_ERROR:
        case types.SEARCH_USER_ERROR:
        case types.FILTER_USER_ERROR:
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

