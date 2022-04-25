import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import rootReducer from './rootReducer'
import rootSaga from './usersagas'

//Creates a Redux middleware and connects the Sagas to the Redux Store
const sagaMiddleware = createSagaMiddleware()

//Array to hold all the Middlewares
const middlewares = [sagaMiddleware]

//NEW CONCEPT
//Enable logger only if Development Mode
if (process.env.NODE_ENV === "development") {
    middlewares.push(logger)
}

//Mount SAGA on the Store
const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
)

//list of Sagas to run
// Run the saga
sagaMiddleware.run(rootSaga)

export default store

