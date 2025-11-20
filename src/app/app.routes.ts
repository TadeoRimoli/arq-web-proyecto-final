import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Home } from './pages/home/home';
import { Market } from './pages/market/market';
import { About } from './pages/about/about';
import { VolatilityTable } from './components/volatility-table/volatility-table';
import { LiveTop20 } from './pages/live-top20/live-top20';
import { Stablecoins } from './pages/stablecoins/stablecoins';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    providers: [provideHttpClient()]
  },
  { path: 'market', component: Market },
  {
    path: 'volatilidad',
    component: VolatilityTable,
    providers: [provideHttpClient()]
  },
  {
    path: 'top-marketcap',
    component: LiveTop20,
    providers: [provideHttpClient()]
  },
  { path: 'about', component: About },
  {
    path: 'stablecoins',
    component: Stablecoins,
    providers: [provideHttpClient()]
  },
 
  { path: '**', redirectTo: '' }
];
