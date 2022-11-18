using Microsoft.AspNetCore.SignalR;
using SignalR.models;

namespace SignalR.Hubs
{

    public class ChatHub: Hub
    {
        public async Task SendMessage(User user, string eventMessage1, string eventMessage2)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, eventMessage1, eventMessage2);
        }
    }
}
