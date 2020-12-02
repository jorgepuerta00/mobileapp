import { loginUserPending, loginUserFail, loginUserSuccess, signOutSuccess, loginUserCancel } from './action';
import Constants from "expo-constants";
import firebase from '../../constants/firebase';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

const appId = Constants.manifest.extra.facebook.AppId;
const facebookPermissions = Constants.manifest.extra.facebook.permissions;

const androidClientId = Constants.manifest.extra.google.androidClientId;
const iosClientId = Constants.manifest.extra.google.iosClientId;
const googlePermissions = Constants.manifest.extra.google.permissions;
const googleScope = Constants.manifest.extra.google.scope;

export function loginFacebook() {
  return async dispatch => {
    dispatch(loginUserPending());   
    await Facebook.initializeAsync(appId);
    try {
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(
        appId,
        facebookPermissions
      );
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        await firebase
          .auth()
          .signInWithCredential(credential) 
          .then(response => {
            if (response) {
              const profile = response.additionalUserInfo.profile
              const payload = {
                id: response.user.uid, 
                documentnumber: null, 
                documenttype: null, 
                firstName: profile.first_name, 
                lastName: profile.middle_name === undefined || profile.middle_name === null ? profile.last_name : profile.middle_name,
                email: profile.email,
                addresses: [],
                avatar: profile.picture.data.url
              }
              dispatch(loginUserSuccess({user: payload}));
            }
          });
          
      }
      else{
        dispatch(loginUserCancel());
      }
    } catch (error) {
      dispatch(loginUserFail(error));
    }      
  }
}


export function loginGoogle() {
  return async dispatch => {
    dispatch(loginUserPending());   
    try {
      const result = await Google.logInAsync({ androidClientId: androidClientId,
                                               iosClientId: iosClientId, 
                                               scopes: googleScope,
                                               permissions: googlePermissions
                                            })
      if (result.type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
        await firebase
        .auth()
        .signInWithCredential(credential)
        .then(function(response) {
          const profile = response.additionalUserInfo.profile
          const payload = {
            id: response.user.uid, 
            documentnumber: null, 
            documenttype: null, 
            firstName: profile.given_name, 
            lastName: profile.family_name,
            email: profile.email,
            addresses: [],
            avatar: profile.picture
          }
          dispatch(loginUserSuccess({user: payload}));
        })
        .catch(function(error) {
          if (error.code != -3)
            dispatch(loginUserFail(error.code));
          else
            dispatch(loginUserCancel());
        }); 
      }
      else{
        dispatch(loginUserCancel());
      }
    } catch (error) {
      if (error.code != -3)
        dispatch(loginUserFail(error));
      else
        dispatch(loginUserCancel());
    }      
  }
}

export function loginFirebase(email, password) {
  return async dispatch => {    
    try {
      dispatch(loginUserPending());
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          if (response) {
            const payload = {
              id: response.user.uid, 
              documentnumber: null,
              documenttype: null, 
              firstName: response.user.displayName == null ? response.user.email.split("@")[0] : response.user.displayName, 
              lastName: "",
              email: response.user.email,
              addresses: [],
              avatar: null
            }
            dispatch(loginUserSuccess({user: payload}));
          }
        });
    } catch (error) {
      dispatch(loginUserFail(error));
    }      
  }
}

export function createUserWithEmailAndPassword(email, password) {
  return async dispatch => {    
    try {
      dispatch(loginUserPending());
      await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(function(user) {
            var user = firebase.auth().currentUser;
            const payload = {
              id: user.uid, 
              documentnumber: null,
              documenttype: null, 
              firstName: user.displayName == null ? user.email.split("@")[0] : user.displayName,  
              lastName: "",
              email: user.email,
              addresses: [],
              avatar: null
            }
            dispatch(loginUserSuccess({user: payload}));

            user.sendEmailVerification().then(function() {
              console.log("Success sendEmailVerification")
            }).catch(function(error) {
              console.log("Error sendEmailVerification")
            });

          })
          .catch(function(error) {
            dispatch(loginUserFail(error));
          })
    } catch (error) {
      dispatch(loginUserFail(error));
    }      
  }
}

export function signOut(){
  return async dispatch => {    
    try{
      dispatch(loginUserPending())
      await firebase
        .auth()
        .signOut()
        .catch(function(error) {
          dispatch(loginUserFail(error));
        })
        .then(response => {
            dispatch(signOutSuccess(response));
        });      
    }
    catch(error){
      dispatch(loginUserFail(error));
    }
  }
}