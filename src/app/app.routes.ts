import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Home } from './pages/home/home';
import { Market } from './pages/market/market';
import { VolatilityTable } from './components/volatility-table/volatility-table';
import { LiveTop20 } from './pages/live-top20/live-top20';
import { Stablecoins } from './pages/stablecoins/stablecoins';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    providers: [provideHttpClient()]
  },
  { path: 'market', component: Market, canActivate: [authGuard] },
  {
    path: 'volatilidad',
    component: VolatilityTable,
    canActivate: [authGuard],
    providers: [provideHttpClient()]
  },
  {
    path: 'top-marketcap',
    component: LiveTop20,
    canActivate: [authGuard],
    providers: [provideHttpClient()]
  },
  {
    path: 'stablecoins',
    component: Stablecoins,
    canActivate: [authGuard],
    providers: [provideHttpClient()]
  },
 
  { path: '**', redirectTo: '' }
];
