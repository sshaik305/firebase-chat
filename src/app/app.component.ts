import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';

export const firebaseConfig = {
  	apiKey: "AIzaSyCTY84h49UwEDpoo4pEZfqazFjnlb9o8n8",
    authDomain: "mychatapp-149dd.firebaseapp.com",
    databaseURL: "https://mychatapp-149dd.firebaseio.com",
    projectId: "mychatapp-149dd",
    storageBucket: "mychatapp-149dd.appspot.com",
    messagingSenderId: "406085264961"
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
	platform: Platform, 
	statusBar: StatusBar, 
	splashScreen: SplashScreen
  ) {
	firebase.initializeApp(firebaseConfig);

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.rootPage = 'TabsPage';
        unsubscribe();
      } else {
        this.rootPage = 'LoginPage';
        unsubscribe();
      }
    });  
	
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

