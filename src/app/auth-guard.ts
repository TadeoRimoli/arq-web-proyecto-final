import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = () => {
  const oauth = inject(OAuthService);
  const router = inject(Router);

  const isAuth = oauth.hasValidAccessToken();

  if (!isAuth) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
