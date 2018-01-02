import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ChatsProvider } from '../../providers/chats/chats';

/**
 * Generated class for the ChatViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-view',
  templateUrl: 'chat-view.html',
})
export class ChatViewPage {
  message: string;
  uid:string;
  interlocutor:string;
  chats:any = [];
  reference:string;
  @ViewChild(Content) content: Content;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public _chats: ChatsProvider) {
		this.uid = navParams.data.uid;
		this.interlocutor = navParams.data.interlocutor;
		
		var ref = [this.uid, this.interlocutor];
		this.reference = '/chats/'+ref.sort().join();
		this._chats.getChatList(this.reference).subscribe((data) => {
			this.chats = data;
		});
  }

  
  ionViewDidEnter() {
    this.content.scrollToBottom();
  }
  
  sendMessage() {
      if(this.message) {
          let chat = {
              from: this.uid,
              message: this.message,
              type: 'message'
          };
		  this._chats.pushChat(chat, this.reference);
		  this._chats.pushChatState(this.uid, this.interlocutor);
		  this.content.scrollToBottom();
          this.message = "";
      }
  }
  
  sendPicture() {
      let chat = {from: this.uid, type: 'picture', picture:null};
      this._chats.getPicture()
      .then((image) => {
          chat.picture =  image;
          this._chats.pushChat(chat, this.reference);
		  this.content.scrollToBottom();
      });
  }

}
