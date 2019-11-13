import { handleActions } from 'redux-actions';
import actions from './Actions';

const defaultState = {
    isAppDataLoaded: false,
    user: null,
    snackbar: null,
    profile: {
        isAvatarLoading: false,
        isNameFormLoading: false
    }
};

const reducer = handleActions({
    [actions.signedIn]: (state, action) => {
        return {
            ...state,
            isAppDataLoaded: true,
            user: action.payload.user
        };
    },

    [actions.appDataLoadingError]: (state, action) => {
        return {
            ...state,
            isAppDataLoaded: true
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
    },

    [actions.updateAvatar]: (state, action) => {
        return {
            ...state,
            profile: {
                isAvatarLoading: true
            } 
        };
    },

    [actions.avatarUpdated]: (state, action) => {
        return {
            ...state,
            profile: {
                isAvatarLoading: false
            } 
        };
    },

    [actions.updateAvatarError]: (state, action) => {
        return {
            ...state,
            profile: {
                isAvatarLoading: false
            } 
        };
    }
  },
  defaultState
);

export default reducer;