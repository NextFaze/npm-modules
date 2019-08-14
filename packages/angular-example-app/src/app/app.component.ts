import { Component } from '@angular/core';
import { ApplicationService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ServiceApp';

  constructor(public appService: ApplicationService) {
    this.title = appService.name;
  }
}
