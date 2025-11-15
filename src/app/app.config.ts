import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, inject } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideOAuthClient, OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { routes } from './app.routes';
export const authConfig: AuthConfig = {
  issuer: 'https://localhost:9443/oauth2/token', 
  redirectUri: window.location.origin,
  clientId: 'C9qHr7w762VD68KUsapKOqPve1Ua',
  responseType: 'code',
  scope: 'openid profile email internal_login',
  strictDiscoveryDocumentValidation: false, 
  };
function initializeOAuth(): Promise<void> {
  const oauthService = inject(OAuthService);
  oauthService.configure(authConfig);
  return oauthService.loadDiscoveryDocumentAndTryLogin().then(() => { });
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    provideAppInitializer(initializeOAuth)
  ]
};
