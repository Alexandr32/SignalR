import { Component } from '@angular/core';
import { SignalRService } from './service/signalR.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(public signalRService: SignalRService) {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
  }

  addMessage() {
    this.signalRService.addMessage();
  }
}
