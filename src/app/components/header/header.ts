import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  @Input() isAuthorized = false;
  
  constructor(private readonly oAuthService: OAuthService) {}
    
    logout() {
    this.oAuthService.revokeTokenAndLogout();
    }
    get user(): any {
      const claims = this.oAuthService.getIdentityClaims();
      return claims;
    }
}
