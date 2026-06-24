import {HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {ApplicationConfig, importProvidersFrom, inject, provideZonelessChangeDetection} from "@angular/core";
import {
    provideRouter,
    withComponentInputBinding,
    withEnabledBlockingInitialNavigation,
    withViewTransitions
} from "@angular/router";
import {authInterceptor} from "@core/interceptors/auth.interceptor";
import {routes as appRotes} from "./app.routes";
import {provideEffects} from "@ngrx/effects";
import {provideStore} from '@ngrx/store';
import {loginEffects} from '@pages/auth';
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {loginFeature} from "@pages/auth/store/user.reducer";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {AuthTokenStorageService} from "@core/services/auth-token-storage.service";
import {JwtModule} from '@auth0/angular-jwt';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthService} from "@core/auth/auth.service";
import {PlatformModule} from '@angular/cdk/platform';
import {ENV} from "@core/tokens/environment.token";
import {providePrimeNG} from "primeng/config";
import Aura from '@primeng/themes/aura';
import {NgxPermissionsModule} from "ngx-permissions";
import { GLOBAL_SHARED_STORE_PROVIDERS } from "@shared/services/global-shared.service";

// ---------- Factories ----------

const jwtAllowedDomains = environment.jwtAllowedDomains ?? ['localhost:4200'];

export function JwtTokenGetter() {
    const token = inject(AuthTokenStorageService).getToken('access_token');
    return token ?? '';
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

// ---------- Core services ----------
const CORE_PROVIDERS = [
    {provide: ENV, useValue: environment},
    AuthTokenStorageService,
    AuthService,
    TranslateService,
    ...GLOBAL_SHARED_STORE_PROVIDERS,
];

// ---------- Third-party modules ----------
const MODULE_PROVIDERS = [
    importProvidersFrom(PlatformModule),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
    importProvidersFrom(
        JwtModule.forRoot({
            config: {
                tokenGetter: JwtTokenGetter,
                allowedDomains: jwtAllowedDomains,
                disallowedRoutes: [],
            },
        }),
    ),
    importProvidersFrom(
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: 'sp',
        }),
    ),
];

// ---------- Angular features ----------
const ANGULAR_PROVIDERS = [
    providePrimeNG({
        theme: {
            preset: Aura,
        },
    }),
    provideHttpClient(
        withInterceptorsFromDi(),
        withInterceptors([authInterceptor]),
    ),
    provideZonelessChangeDetection()
];

// ---------- Router ----------
const ROUTER_PROVIDERS = [
    provideRouter(appRotes,
        withComponentInputBinding(),
        withViewTransitions(),
        withEnabledBlockingInitialNavigation(),
    ),
];

// ---------- NgRx ----------
const NGRX_PROVIDERS = [
    provideStore({
        router: routerReducer,
        [loginFeature.name]: loginFeature.reducer
    }),
    provideEffects(
        loginEffects,
    ),
    provideRouterStore(),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: environment.production,
        autoPause: true,
        trace: false,
        traceLimit: 75,
    }),
];

// ---------- Final Config ----------
export const appConfig: ApplicationConfig = {
    providers: [
        ...CORE_PROVIDERS,
        ...MODULE_PROVIDERS,
        ...ANGULAR_PROVIDERS,
        ...ROUTER_PROVIDERS,
        ...NGRX_PROVIDERS,
    ],
};
