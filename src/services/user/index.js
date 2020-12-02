import { Images } from '../../constants';
import { types } from './action' 

const defaultName = "Invitado"

const initialState = {
    name: defaultName,
    avatar: Images.ProfileEmpty,
    payload: null,
    pending: false,
    error: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {    
        case types.UPDATE_NAME:
          return { 
            ...state, 
            name: action.name 
          };
        case types.UPDATE_AVATAR:
          return { 
            ...state, 
            avatar: action.avatar 
          };
        case types.CURRENT_SESSION:
          return {
              ...state,
              name: action.payload.firstName != null ? action.payload.firstName : defaultName,
              avatar: action.payload.avatar != null ? action.payload.avatar : Images.ProfileEmpty,
              pending: false,
              error: false,
              payload: action.payload
          }
        case types.POST_USER_PENDING: 
          return {
              ...state,
              pending: true,
              error: false,
              payload: null
          }
        case types.POST_USER_SUCCESS:
          return {
              ...state,
              name: action.payload.firstName != null ? action.payload.firstName : defaultName,
              avatar: action.payload.avatar != null ? action.payload.avatar : Images.ProfileEmpty,
              pending: false,
              error: false,
              payload: action.payload
          }
        case types.POST_USER_ERROR:
          return {
              ...state,
              pending: false,
              error: true,
              payload: action.error
          }
        case types.CLEAR_USER_LOGIN:
            return {
                ...state,
                pending: false,
                error: false,
                payload: null,
                name: defaultName,
                avatar: Images.ProfileEmpty
            }
        default:
          return state;
      }
}

export const getName = state => state.userReducer.name;
export const getAvatar = state => state.userReducer.avatar;
export const getUser = state => state.userReducer.payload;
export const getUserPending = state => state.userReducer.pending;
export const getUserError = state => state.userReducer.error;