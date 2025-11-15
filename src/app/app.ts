import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  isAuthorized = signal(false);
    constructor(private oAuthService: OAuthService) {
      this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        this.isAuthorized.set(this.oAuthService.hasValidAccessToken());
      });
    }
    login() {
    this.oAuthService.initLoginFlow();
    }
    logout() {
    this.oAuthService.revokeTokenAndLogout();
    }
    
}