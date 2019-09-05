import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { ChatService } from '../../services/chat/chat.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  title = "Messages";
  chatList : any = [];
  showData : boolean = true;
  userData : any = {};
  messageBody : string;

  constructor(private loaderService : LoaderService,
              private chatService : ChatService,
              private authService : AuthService) {
                this.authService.loginStatusChange.subscribe(
                  (resp) => {
                    console.log(resp);
                    if(resp) {
                      this.authService.checkLoggedIn().subscribe(
                        (resp) => {
                          this.userData = resp;
                          this.getChat();
                        }
                      )
                    }
                  },
                  (error) =>{
                  }
                )
               }

  ngOnInit() {
    
  }

  getChat() {
    this.loaderService.presentLoading();
    this.chatService.getChat(this.userData.id, this.userData.user_type).subscribe(
      (resp) => {
        console.log(resp);
        this.chatList = resp;
        if(this.chatList && this.chatList.length) {
          this.showData = true
        }
        else {
          this.showData = false;
        }
        this.loaderService.dismissLoading();
      },
      (error) => {
        this.showData = false;
        this.loaderService.dismissLoading();
      }
    )
  }

  addMessage() {
    if(!this.messageBody) {
      return false;
    }
    let data =  {
      'body' : this.messageBody
    }
    this.loaderService.presentLoading();
    this.chatService.addUserMessage(data).subscribe(
      (resp) => {
        console.log(resp);
        if(resp) {
          this.getChat();
          this.messageBody = '';
        }
        this.loaderService.dismissLoading();
      },
      (error) => {
        this.loaderService.dismissLoading();
      }
    )
  }
  
}
