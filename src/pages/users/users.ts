import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
	uid: any;
	contacts: any = [];
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams
	) {
		
	}
  
	ngOnInit() {
		this.uid = firebase.auth().currentUser.uid;
		firebase.database().ref('users').once('value').then((data) => {
			if(data.val() instanceof Object){
				for(let index in data.val()){
					this.contacts.push({key: index, email: data.val()[index].email});
				}
			}
		});
    }

	openChat(key) {
        let param = {uid: this.uid, interlocutor: key};
        this.navCtrl.push('ChatViewPage', param);
    }

}
