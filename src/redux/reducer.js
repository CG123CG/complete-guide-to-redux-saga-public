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
            console.log("Action Object ", action)
            newState = {
                ...state,
                loading: true
            }
            break
        case types.LOAD_USERS_SUCCESS:
            newState = {
                ...state,
                loading: false,
                users: action.payload
            }
            break
        case types.CREATE_USER_SUCCESS:
        case types.UPDATE_USER_SUCCESS:
            newState = {
                ...state,
                loading: false,
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

