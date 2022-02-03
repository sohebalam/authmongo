import { combineReducers } from "redux"

import { profileReducer } from "./userReducer"

const reducers = combineReducers({
  profile: profileReducer,
})

export default reducers
