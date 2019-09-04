import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }

  getChat(chat_from, user_type) {
    console.log(chat_from, user_type);
    return this.http.get(this.apiService.prepRoute('get_user_chat', {'chat_from' :chat_from, 'chat_to' : '', 'user_type' : user_type}));
  }
}
