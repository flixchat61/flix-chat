import {
  ACTION,
} from './actionTypes';

// action creators

export const updateAction = update => ({
  type: ACTION,
  payload: {
    ...update
  }
});