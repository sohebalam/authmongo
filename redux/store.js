import { createStore, applyMiddleware } from "redux"
import { HYDRATE, createWrapper } from "next-redux-wrapper"
import thunk from "redux-thunk"
import reducers from "./reducers"

const combineMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension")
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  } else {
    return reducers(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, combineMiddleware([thunk]))
}

export const wrapper = createWrapper(initStore)
