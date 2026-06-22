import { User } from './user.models';
import {createFeature, createReducer, on} from "@ngrx/store";
import * as UserLoginActions from './user.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UserState {
    user: User | null;
    access_token: string | boolean | null;
    loading: boolean | null;
    role: string | null;
    error: string | null;
}

export const initialState: UserState = {
    user: null,
    access_token: null,
    loading: null,
    role: null,
    error: null
};

export const loginFeature = createFeature({
  name: USERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(UserLoginActions.init,
      state => ({ ...state})
    ),

    on(UserLoginActions.initAuthorized,
      (state, {access_token}) => ({...state, access_token: access_token})
    ),

    on(UserLoginActions.initUnauthorized,
      state => ({ ...state, user: null, loading: false, error: null })
    ),

    on(UserLoginActions.initError,
      (state, {error}) => ({ ...state, loading: false, error: error })
    ),

    //Login
    on(UserLoginActions.login,
      (state) => ({ ...state, loading: true })
    ),

    on(UserLoginActions.loginSuccess,
      (state, {user}) => ({ ...state, user: user, loading: false, error: null })
    ),

    on(UserLoginActions.loginError,
      (state, {error}) => ({ ...state,  error: error.message, loading: false })
    ),

    //Logout
    on(UserLoginActions.logOut,
      state => ({ ...state, loading: true })
    ),

    on(UserLoginActions.logOutSuccess,
      state => ({ ...state, error: state.error, loading: false })
    ),

    on(UserLoginActions.logOutError,
      state => ({ ...state,  error: state.error, loading: false })
    ),

    //Update
    on(UserLoginActions.updateUser,
      state => ({ ...state, loading: true, error: null })
    ),

    on(UserLoginActions.updateUserSuccess,
      state => ({ ...state, user: state.user, loading: false })
    ),

    on(UserLoginActions.updateUserError,
      state => ({ ...state,  loading: false, error: state.error })
    ),
  )
})
