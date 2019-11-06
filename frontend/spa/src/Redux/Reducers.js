import { handleActions } from 'redux-actions';
import actions from './Actions';

const defaultState = {
    isAppDataLoaded: false,
    user: null,
    snackbar: null
};

const reducer = handleActions(
  {
    [actions.signedIn]: (state, action) => {
      return {
            ...state,
            isAppDataLoaded: true,
            user: action.payload.user
        };
    },

    [actions.signedOut]: (state, action) => {
      return {
            ...state,
            user: null
        };
    },

    [actions.showSnackbar]: (state, action) => {
      return {
            ...state,
            snackbar: {
                variant: action.payload.variant,
                message: action.payload.message
            }
        };
    },

    [actions.hideSnackbar]: (state, action) => {
      return {
            ...state,
            snackbar: null
        };
    }
  },
  defaultState
);

export default reducer;