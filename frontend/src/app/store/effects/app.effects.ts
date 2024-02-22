import { Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { ApplicationService } from "@src/app/app.service";
import {catchError, exhaustMap, map, of} from "rxjs";
import {
    appActions, CreateHotel, CreateHotelFailure, CreateHotelSuccess, FetchHotelsFailure, FetchHotelsSuccess,
    /* LogInFailure,
    LogInSuccess,
    RefreshTokenFailure,
    RefreshTokenSuccess,
    SignUpUserFailure,
    SignUpUserSuccess */
} from "../actions/app.actions";


@Injectable()
export class AppEffects {
    
    constructor(
        private $actions: Actions,
        private appService: ApplicationService,
        private router: Router,
    ) {
    }

    loadAllHotels$ = createEffect(() => {
         return this.$actions.pipe(
            ofType(appActions.FETCH_HOTELS),
            exhaustMap(() => {
              return this.appService.getAllHotels().pipe(
                map((hotels) =>
                  FetchHotelsSuccess({ payload:hotels })
                ),
                catchError(({ message }: { message: string }) =>
                  of(FetchHotelsFailure({ payload:message }))
                )
              );
            })
          );
        },
      );

    CreateHotel$ = createEffect(() => {
            return this.$actions.pipe(
                ofType(appActions.CREATE_HOTEL),
                exhaustMap((action: any) => {
                    const {payload} = action;
                    return this.appService.createHotel(payload).pipe(
                        map(response => {
                            this.router.navigateByUrl("/").catch();
                            return CreateHotelSuccess({payload: response})
                        }),
                        catchError(error => {
                            console.log(error)
                            return of(CreateHotelFailure(error))
                        })
                    )
                })
            )
        }
    );

    /*
    Login$ = createEffect(() => {
            return this.$actions.pipe(
                ofType(authActions.LOGIN_USER),
                exhaustMap((action: any) => {
                    const {usernameOrEmail, password, ...rest} = action;
                    return this.userService.login({usernameOrEmail, password}).pipe(
                        map(response => {
                            return LogInSuccess({payload: response})
                        }),
                        catchError(error => {
                            console.log(error)
                            return of(LogInFailure(error))
                        })
                    )
                })
            )
        }
    );

    SignUp$ = createEffect(() => {
            return this.$actions.pipe(
                ofType(authActions.SIGNUP_USER),
                exhaustMap((action: any) => {
                    const {username, email, password, ...rest} = action;
                    return this.userService.register({username, email, password}).pipe(
                        map(response => {
                            this.router.navigateByUrl("/login");
                            return SignUpUserSuccess();
                        }),
                        catchError(error => {
                            console.log(error)
                            return of(SignUpUserFailure(error));
                        })
                    )
                })
            )
        }
    );

    LoginSuccess$ = createEffect(() => {
            return this.$actions.pipe(
                ofType(authActions.LOGIN_SUCCESS),
                tap((action: any) => {
                    this.router.navigate(['']);
                })
            )
        }, {dispatch: false}
    );

    LogoutSuccess$ = createEffect(() => {
            return this.$actions.pipe(
                ofType(authActions.LOGOUT_USER),
                tap((action: any) => {
                    this.router.navigate(['']);
                })
            )
        }, {dispatch: false}
    );

    RefreshToken$ = createEffect(() => {
            return this.$actions.pipe(
                ofType(authActions.REFRESH_ACCESS_TOKEN),
                exhaustMap((action: any) => this.userService.refreshToken(action.payload).pipe(
                    map(response => {
                        console.log(response)
                        return RefreshTokenSuccess({payload: response})
                    }),
                    catchError(error => {
                        console.log(error)
                        this.router.navigateByUrl('/login')
                        return of(RefreshTokenFailure(error))
                    })
                ))
            )
        }
    );

    RefreshTokenSuccess$ = createEffect(() => {
            return this.$actions.pipe(
                ofType(authActions.REFRESH_TOKEN_SUCCESS),
                tap((action: any) => {
                    console.log("token refreshed!")
                })
            )
        }, {dispatch: false}
    );
    */
}