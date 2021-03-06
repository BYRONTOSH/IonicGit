import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mostarDatos:boolean = false;
  picture:string;
  name:string;
  email:string;
  constructor(private afAuth: AngularFireAuth, private router:Router,private googlePlus: GooglePlus,private platform: Platform) 
  { }

  ngOnInit() {
  }

  loginGoogle() {
    if (this.platform.is('android')) {
      this.loginGoogleAndroid();
    } else {
      this.loginGoogleWeb();
    }
  }

  loginFacebook(){}
  async loginGoogleWeb() 
  {
    const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    const user = res.user
    console.log(user)
    this.picture = user.photoURL
    this.name = user.displayName
    this.email = user.email
    this.mostarDatos=true
 }


  async cerrarSesion()
  {
    this.router.navigate(['']);
    this.mostarDatos=false
}
 
async loginGoogleAndroid() {
  const res = await this.googlePlus.login({
    'webClientId': "101258047324-s1fccgm4rsosiq7ki3ovs9ci7dteaon7.apps.googleusercontent.com",
    'offline': true
  });
  const resConfirmed = await this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
  const user = resConfirmed.user;
  this.picture = user.photoURL;
  this.name = user.displayName;
  this.email = user.email;
  this.mostarDatos=true
}



}
