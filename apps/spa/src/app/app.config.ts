import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideKeycloakAngular } from './keycloak.config';
import { includeBearerTokenInterceptor } from 'keycloak-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideBrowserGlobalErrorListeners(), 
    provideRouter(appRoutes)
  ],
};
