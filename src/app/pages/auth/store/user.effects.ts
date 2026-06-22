import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

import {AuthService} from "@core/services/auth/auth.service";
import * as fromUserActions from './user.actions';

//Init
export const init = createEffect(
  (init$ = inject(Actions),
   authService = inject(AuthService)) => {
    return init$.pipe(
      ofType(fromUserActions.init),
        switchMap(() =>
        authService.init().pipe(
          map((auth) => fromUserActions.initAuthorized({access_token: auth})),
          catchError((error: { message: string }) =>
            of(fromUserActions.initUnauthorized({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

//Login
export const login = createEffect(
  (login$ = inject(Actions),
   authService = inject(AuthService),
   router = inject(Router)) => {
    return login$.pipe(
      ofType(fromUserActions.login),
      exhaustMap((credentials) =>
        authService.login(credentials).pipe(
          map((user) => fromUserActions.loginSuccess({user})),
          tap(() => router.navigate([''])),
          catchError((req) =>
            of(fromUserActions.loginError(req))
          )
        )
      )
    );
  },
  { functional: true }
);

//Logout
export const logout = createEffect(
  (logout$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)) => {
    return logout$.pipe(
      ofType(fromUserActions.logOut),
      exhaustMap(_ =>
        authService.logout().pipe(
          map((user) => fromUserActions.logOutSuccess(user)),
          tap(() => router.navigate(['/login'])),
          catchError((error: { message: string }) =>
            of(fromUserActions.logOutError({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

//User update
export const updateUser = createEffect(
  (userUpdate$ = inject(Actions),
   authService = inject(AuthService)) => {
    return userUpdate$.pipe(
      ofType(fromUserActions.updateUser),
      exhaustMap(credentials =>
        authService.userUpdate(credentials).pipe(
          map((user) => fromUserActions.updateUserSuccess(user)),
          catchError((error: { message: string }) =>
            of(fromUserActions.updateUserError({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
