import { Component } from '@angular/core';
import { NewsGlobalOverview } from '../../components/news-global-overview/news-global-overview';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsGlobalOverview],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {

}
