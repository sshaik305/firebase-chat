import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatsProvider } from '../../providers/chats/chats';

/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
	uid:string;
	chats: any = [];
	constructor(public navCtrl: NavController, public navParams: NavParams, public _chats: ChatsProvider) {
		this.uid = this._chats.getUid();
		this._chats.getChats().subscribe((data) => {
			this.chats = data;
		});
	}

	openChat(key) {
        let param = {uid: this.uid, interlocutor: key};
        this.navCtrl.push('ChatViewPage', param);
    }

}
