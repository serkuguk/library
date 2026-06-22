export enum Types {
  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',
  INIT_UNAUTHORIZED = '[User] Init: Unauthorized',
  INIT_ERROR = '[User] Init: Error',

  LOGIN = '[User] Login: Start',
  LOGIN_SUCCESS = '[User] Login: Success',
  LOGIN_ERROR = '[User] Login: Error',

  LOGOUT = '[User] Logout: Start',
  LOGOUT_SUCCESS = '[User] Logout: Success',
  LOGOUT_ERROR = '[User] Logout: Error',

  UPDATE = '[User] Update: Start',
  UPDATE_SUCCESS = '[User] Update: Success',
  UPDATE_ERROR = '[User] Update: Error'
}
