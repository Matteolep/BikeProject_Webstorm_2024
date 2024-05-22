import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import {LogLevel, provideAuth} from "angular-auth-oidc-client";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideTransloco({
    config: {
      availableLangs: ['en', 'fr', 'es'],
      defaultLang: 'en',
      // Remove this option if your application doesn't support changing language in runtime.
      reRenderOnLangChange: true,
      prodMode: !isDevMode(),
    },
    loader: TranslocoHttpLoader
  }),
    provideAuth({
      config: {
        authority: 'http://10.19.4.3:8080/auth/realms/BikeProject',
        redirectUrl: "http://localhost:4200",
        postLogoutRedirectUri: "http://localhost:4200/",
        clientId: 'WebClient',
        scope: 'email profile roles web-origins',
        responseType: 'id_token token',
        silentRenew: false,
        useRefreshToken: true,
        logLevel: LogLevel.Debug,
      },
    }),]
};
