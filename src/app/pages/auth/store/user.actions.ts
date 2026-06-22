import {createAction, props} from '@ngrx/store'
import {User} from './user.models';
import {Types} from './actionTypes';

// Init
export const init = createAction(
  Types.INIT
);

export const initAuthorized = createAction(
  Types.INIT_AUTHORIZED,
  props<{ access_token: boolean }>()
);

export const initUnauthorized = createAction(
  Types.INIT_UNAUTHORIZED,
  props<{error: string}>()
);

export const initError = createAction(
  Types.INIT_ERROR,
  props<{ error: string }>()
);


// Login
export const login = createAction(
  Types.LOGIN,
  props<{ username: string, password: string}>()
);

export const loginSuccess = createAction(
  Types.LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const loginError = createAction(
  Types.LOGIN_ERROR,
  props<{ error: any }>()
);


// Log Out
export const logOut = createAction(
  Types.LOGOUT,
  props<{ user: null }>()
);

export const logOutSuccess = createAction(
  Types.LOGOUT_SUCCESS,
  props<{ user: null }>()
);

export const logOutError = createAction(
  Types.LOGOUT_ERROR,
  props<{ error: string }>()
);

// Update
export const updateUser = createAction(
  Types.UPDATE,
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  Types.UPDATE_SUCCESS,
  props<{ user: User }>()
);

export const updateUserError = createAction(
  Types.UPDATE_ERROR,
  props<{ error: string }>()
);
