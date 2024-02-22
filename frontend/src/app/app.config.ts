import {ApplicationConfig, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {AppEffects} from "@src/app/store/effects/app.effects";
import {ApplicationService} from "@src/app/app.service";
import {provideHttpClient} from "@angular/common/http";
import { appReducer, reducers, metaReducers, appFeature } from './store/reducers/app.reducers';
import { PersistState, PersistStateModule } from '@ngrx-addons/persist-state';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideStore() ,provideStoreDevtools({
    maxAge: 25, // Retains last 25 states
    logOnly: !isDevMode(), // Restrict extension to log-only mode
    autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
  }), provideEffects(AppEffects), provideState(appFeature),provideHttpClient()]
};
