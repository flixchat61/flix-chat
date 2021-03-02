import { combineReducers } from 'redux';
import {
  ACTION
} from './actionTypes';
import reduxState from './state';

const defaultReducer = (type, stateKey) => (state = reduxState[stateKey], action) => {
  if (action.type === type) return merge(state, action.payload);
  return state;
};

const reducer = combineReducers({
  reduxState: defaultReducer(ACTION, 'sample'),
});

export default reducer;