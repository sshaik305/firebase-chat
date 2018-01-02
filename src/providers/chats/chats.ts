import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the ChatsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatsProvider {

	constructor(public camera: Camera) {
		console.log('Hello ChatsProvider Provider');
	}
	
	getUid(){
		return firebase.auth().currentUser.uid;
	}

	getChats(){
		var uid = firebase.auth().currentUser.uid;
		var db = firebase.database();

		return new Observable(observer => {

			db.ref('/users/'+uid+'/chats').on("value", function(snapshot) {
				var users = [];
				for(let index in snapshot.val()){
					if(snapshot.val()[index]){
						firebase.database().ref('/users/'+index).once('value').then((data) => {
							users.push({key: index, email: data.val().email});
							observer.next(users);
						});
					}
				}
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
				
		});
	}
	
	getChatList(chatRef){

		var db = firebase.database();

		return new Observable(observer => {

			db.ref(chatRef).on("value", function(snapshot) {
				var chats = [];
				for(let index in snapshot.val()){
					chats.push(snapshot.val()[index]);
				}
				observer.next(chats);
				//resolve(chats);
			}, function (errorObject) {
			  console.log("The read failed: " + errorObject.code);
			});
				
		});
	}
	
	pushChat(chat, chatRef){
		firebase.database().ref(chatRef).push(chat);
	}
	
	pushChatState(uid, interlocutor){
		firebase.database().ref('/users/'+uid+'/chats/'+interlocutor).set(true);
		firebase.database().ref('/users/'+interlocutor+'/chats/'+uid).set(true);
	}
	
	getPicture() {
		let base64Picture;
		let options: CameraOptions = {
			destinationType: 0,
			sourceType: 0,
			encodingType:0  
		};

		let promise = new Promise((resolve, reject) => {
			
			this.camera.getPicture(options).then((imageData) => {
				base64Picture = "data:image/jpeg;base64," + imageData;
				resolve(base64Picture);
			}, (error) => {
				reject(error);
			});

		});
		return promise;
	}

}
