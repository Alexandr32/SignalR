import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr"
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: User[] = [];

  private hubConnection: signalR.HubConnection | undefined
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('http://localhost:5136/chatHub')
                              .build();

      this.hubConnection
        .start()
        .then(() => console.log('СигналР подключен'))
        .catch(err => console.log('Ошибка при подключении: ' + err))
    }

    public addTransferChartDataListener = () => {
      this.hubConnection?.on('ReceiveMessage', (user: User, eventMessage1: string, eventMessage2: string) => {

        console.log(user, eventMessage1, eventMessage2);
        this.data.push(user)

      });
    }

    public addMessage() {


      const user = new User();
      user.message = 'Сообщение'
      user.name = 'Пользователь'

      const eventMessage1 = 'какое-то сообщение 1'
      const eventMessage2 = 'какое-то сообщение 2'

      this.hubConnection?.invoke('SendMessage', user, eventMessage1, eventMessage2)
      .catch((error) => {
        console.log(error);
      })
    }
}
