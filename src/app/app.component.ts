import { Component, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'call-log-manager-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle('Call Log Manager');
  }
}
