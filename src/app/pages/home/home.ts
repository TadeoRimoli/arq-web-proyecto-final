import { Component } from '@angular/core';
import { NewsGlobalOverview } from '../../components/news-global-overview/news-global-overview';

@Component({
  selector: 'app-home',
  imports: [NewsGlobalOverview],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
