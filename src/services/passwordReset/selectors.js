import { resetPasswordSucess, resetPasswordPending, resetPasswordFail } from './action';
import firebase from '../../constants/firebase';

export function resetPassword(email) {
  return async dispatch => {    
    try {
      dispatch(resetPasswordPending());
      await firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(function() {
            dispatch(resetPasswordSucess(email));
          })
          .catch(function(error) {
            dispatch(resetPasswordFail(error));
          })
    } catch (error) {
      dispatch(resetPasswordFail(error));
    }      
  }
}