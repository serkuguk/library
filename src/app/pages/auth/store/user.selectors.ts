import {createFeatureSelector, createSelector} from "@ngrx/store";
import {USERS_FEATURE_KEY, UserState} from './user.reducer';

export const getUserState = createFeatureSelector<UserState>(USERS_FEATURE_KEY);

export const getToken = createSelector(
  getUserState,
  (state) => state.access_token
);

export const getUser = createSelector(
  getUserState,
  (state) => state.user
);

export const getLoading = createSelector(
  getUserState,
  (state: UserState) => state.loading
)

export const getLoadingError = createSelector(
  getUserState,
  (state: UserState) => state.error
)

export const getIsAuthenticated = createSelector(
  getUserState,
  (state: UserState) => !!state.access_token
)

export const getRoleId = createSelector(
  getUserState,
  getUser,
  (state, user) => state.user && user?.role
)
